using Dapper;
using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Options;
using REC.Data.Contracts;
using REC.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace REC.Data
{
    public class VideoRepository : BaseRepository, IVideoRepository
    {
        private readonly string url;

        public VideoRepository(IOptions<ConnOptions> config) : base(config)
        {
            this.url = config.Value.ApiUrl;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="idchannel"></param>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        public PaginatedResult<Video> Get(int idchannel, DateTime start)
        {
            string fQuery = @" SELECT TOP 1 [V].*
                               FROM             [Video] AS [V]
                               WHERE        [V].[IdChannel]  = @idchannel
                               AND          [V].[CreatedAt] >= @start
                               ORDER BY     [V].[CreatedAt] ASC;";

            var res = base.Context.QueryFirstOrDefault<Video>(fQuery, new { idchannel, start });

            string qNext = @"SELECT TOP 1 * FROM [Video] 
                             WHERE [IdChannel] = @idchannel AND [Id] > @id ORDER BY [Id] ASC;";
            string qPrev = @"SELECT TOP 1 * FROM [Video] 
                             WHERE [IdChannel] = @idchannel AND [Id] < @id ORDER BY [Id] DESC;";

            if (res != null)
            {
                Video nVideo = base.Context.QueryFirstOrDefault<Video>(qNext, new { idchannel, res.Id });
                Video pVideo = base.Context.QueryFirstOrDefault<Video>(qPrev, new { idchannel, res.Id });

                var retorno = new PaginatedResult<Video>();
                retorno.Video = res;

                if (nVideo != null)
                    retorno.next = nVideo.Id;

                if (pVideo != null)
                    retorno.prev = pVideo.Id;

                Channel ch = base.Context.Get<Channel>(idchannel);

                retorno.Url = $"{this.url}{ch.Folder}/{retorno.Video.FilePath}/{retorno.Video.FileName}";
                return retorno;
            }
            else
            {
                return new PaginatedResult<Video>();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="idchannel"></param>
        /// <returns></returns>
        public PaginatedResult<Video> Get(int idchannel)
        {
            string query = @" SELECT TOP 2 [V].* FROM video AS [V]
                              WHERE [V].[IdChannel] = @idchannel
                              ORDER BY [V].[CreatedAt] DESC; ";

            IEnumerable<Video> res = base.Context.Query<Video>(query, new { idchannel });

            if (res.Count() == 0)
            {
                return new PaginatedResult<Video>();
            }

            var retorno = new PaginatedResult<Video>() { Video = res.FirstOrDefault() };

            retorno.Url = this.url;

            if (res.Count() > 1)
                retorno.prev = res.LastOrDefault().Id;

            Channel ch = base.Context.Get<Channel>(idchannel);

            retorno.Url = $"{this.url}{ch.Folder}/{retorno.Video.FilePath}/{retorno.Video.FileName}";

            return retorno;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="idchannel"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public PaginatedResult<Video> Get(int idchannel, int id)
        {
            string query = @" SELECT [V].* FROM video AS [V]
                               WHERE [V].[IdChannel] = @idchannel AND [V].[Id] = @id; ";

            string qNext = @"SELECT TOP 1 * FROM video 
                            WHERE IDCHANNEL = @idchannel AND id > @id ORDER BY id ASC";

            string qPrev = @"SELECT TOP 1 * FROM video 
                            WHERE IDCHANNEL = @idchannel AND id < @id ORDER BY id DESC";

            Video nVideo = base.Context.QueryFirstOrDefault<Video>(qNext, new { idchannel, id });
            Video pVideo = base.Context.QueryFirstOrDefault<Video>(qPrev, new { idchannel, id });

            Video res = base.Context.QueryFirst<Video>(query, new { idchannel, id });
            Channel ch = base.Context.Get<Channel>(idchannel);

            if (res == null)
            {
                return new PaginatedResult<Video>();
            }

            var retorno = new PaginatedResult<Video>() { Video = res };

            if (nVideo != null)
            {
                retorno.next = nVideo.Id;
            }

            if (pVideo != null)
            {
                retorno.prev = pVideo.Id;
            }

            retorno.Url = $"{this.url}{ch.Folder}/{res.FilePath}/{retorno.Video.FileName}";
            return retorno;
        }
    }
}
