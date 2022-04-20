using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Microsoft.IdentityModel.Tokens;
using Entities.DTO;
using System.IO;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly SymmetricSecurityKey _key;
        private string Key = "yU8Fx0PKYbA14yDO90vtsDfpoYNKF7Rn";
        private string IV = "qx5idVRpf8ZI49WH";

        public AccountController(DataContext context, IConfiguration config)
        {
            _context = context;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            try
            {
                loginDto.Username = Decrypt(Convert.FromBase64String(loginDto.Username.Replace(' ', '+')));
                loginDto.Password = Decrypt(Convert.FromBase64String(loginDto.Password.Replace(' ', '+')));

                var user = await _context.AppUser.FirstOrDefaultAsync(x => x.Username.ToLower() == loginDto.Username.ToLower());

                if (user == null) return Unauthorized("Invalid username");

                using var hmac = new HMACSHA512(user.PasswordSalt);
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != user.Password[i]) return Unauthorized("Invalid password");
                }

                return new UserDto
                {
                    Username = user.Username,
                    Token = Createoken(user)
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        public string Createoken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.Username)
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha384Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        private string Decrypt(byte[] cipherText)
        {
            string plaintext = null;
            try
            {
                // Create AesManaged    
                using (AesManaged aes = new AesManaged())
                {
                    //aes.BlockSize = 128;
                    aes.Padding = PaddingMode.PKCS7;
                    aes.Mode = CipherMode.CBC;

                    ICryptoTransform decryptor = aes.CreateDecryptor(Encoding.UTF8.GetBytes(Key), Encoding.UTF8.GetBytes(IV));
                    using (MemoryStream ms = new MemoryStream(cipherText))
                    {
                        using (CryptoStream cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read))
                        {
                            using (StreamReader reader = new StreamReader(cs)) plaintext = reader.ReadToEnd();
                        }
                    }
                }
                return plaintext;
            }
            catch (Exception)
            {
                throw new Exception("Unable to decrypt password."); // encryption failed
            }
        }
    }
}