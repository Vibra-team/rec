using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using REC.Data;
using REC.Data.Contracts;
using REC.Service;
using REC.Service.Contracts;
using System.Configuration;
using System.IO;
using System.Text;

namespace REC
{
    public class Startup
    {
        public IConfiguration Configuration { get; private set; }

        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddOptions();

            services.Configure<ConnOptions>(this.Configuration.GetSection("ConnectionStrings"));

            services.AddScoped<IChannelService, ChannelService>();
            services.AddScoped<ISocialMediaChannelService, SocialMediaChannelService>();
            services.AddScoped<IVideoService, VideoService>();
            services.AddScoped<IClipService, ClipService>();
            services.AddScoped<ICampaignService, CampaignService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IClipSocialMediaService, ClipSocialMediaService>();

            services.AddScoped<IChannelRepository, ChannelRepository>();
            services.AddScoped<ISocialMediaRepository, SocialMediaRepository>();
            services.AddScoped<IVideoRepository, VideoRepository>();
            services.AddScoped<IClipRepository, ClipRepository>();
            services.AddScoped<ICutRepository, CutRepository>();
            services.AddScoped<ICampaignRepository, CampaignRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IClipSocialMediaRepository, ClipSocialMediaRepository>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            #region [cors]

            services.AddCors();

            #endregion

            #region [JWT]

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                            .GetBytes(Configuration.GetSection("JWTKey:secret").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            #endregion

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "REC API", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "TOKEN JWT",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                   {
                     new OpenApiSecurityScheme
                     {
                       Reference = new OpenApiReference
                       {
                         Type = ReferenceType.SecurityScheme,
                         Id = "Bearer"
                       }
                      },
                      new string[] { }
                    }
                  });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
            Path.Combine(Directory.GetCurrentDirectory(), "Videos")),
                RequestPath = "/Videos"
            });

            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "REC API v1"));
            app.UseCors(x => { x.AllowAnyHeader(); x.AllowAnyMethod(); x.AllowAnyOrigin(); });
           // app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}
