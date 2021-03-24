using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Sinks.Elasticsearch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                //Configuração default
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                })
                  //Configuração do Elastic
                  .ConfigureAppConfiguration((hostingContext, config) =>
                  {
                      var settings = config.Build();
                      Log.Logger = new LoggerConfiguration()
                          .Enrich.FromLogContext()
                          .WriteTo.Elasticsearch(
                          new ElasticsearchSinkOptions(new Uri(settings["ElasticConfiguration:Uri"]))
                          {
                              AutoRegisterTemplate = true
                          })
                      .CreateLogger();
                  });

    }
}
