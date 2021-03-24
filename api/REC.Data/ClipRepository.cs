using Dapper;
using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Options;
using REC.Data.Contracts;
using REC.Model;
using REC.Model.Filters;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace REC.Data
{
    public class ClipRepository : BaseRepository, IClipRepository
    {
        private readonly string _url;
        private readonly string _uploadpath;        

        public ClipRepository(IOptions<ConnOptions> config) : base(config)
        {
            this._url = config.Value.ApiUrl;
            this._uploadpath = config.Value.UploadDirectory;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="clip"></param>
        /// <returns></returns>
        public Clip Add(Clip clip)
        {
            clip.Id = Convert.ToInt32(this.Context.Insert<Clip>(clip));

            if (clip.SocialMedias != null)
            {
                clip.SocialMedias.ToList().ForEach(c => { c.IdClip = clip.Id; c.Status = 0; });
                this.Context.Insert(clip.SocialMedias);
            }

            return clip;
        }

        public string Download(int idclip)
        {
            var clip = this.Get(idclip);            
            string folder = string.Empty;
            int chtype = 0;

            if (!clip.UploadedByUser.HasValue || clip.UploadedByUser.HasValue && clip.UploadedByUser.Equals(false))
            {
                string query = @"
                    SELECT DISTINCT CH.[Folder]
                    FROM [Clip] as C
                    JOIN [Cut] as CUT on CUT.[IdClip] = C.Id
                    JOIN Video as V on V.Id = CUT.[IdVideo]
                    JOIN [Channel] AS CH ON CH.[Id] = V.[IdChannel]
                    WHERE C.[Id] = @idclip;";

                folder = $"{base.Context.Query<string>(query, new { idclip }).FirstOrDefault()}/output/";

                query = @"
                    SELECT DISTINCT CH.[ChannelType]
                    FROM [Clip] AS C
                    JOIN [Cut] AS CUT on CUT.[IdClip] = C.[Id]
                    JOIN [Video] AS V on V.[Id] = CUT.[IdVideo]
                    JOIN [Channel] AS CH ON CH.[Id] = V.[IdChannel]
                    WHERE C.[Id] = @idclip;";

                chtype = base.Context.Query<int>(query, new { idclip }).FirstOrDefault();
            }
            else
            {            
                folder = "uploads/";
            }         

            string extension = clip.Gif.HasValue && clip.Gif.Value.Equals(true) ? "gif" : "mp4";

            extension = chtype == 1 ? "mp3" : extension;

            return $"{this._url}{folder}{idclip}.{extension}";
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Clip Get(int id)
        {
            return base.Context.Get<Clip>(id);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public Page<Clip> Get(int pindex, int psize, ClipFilter filter)
        {
            Page<Clip> result = new Page<Clip>();
            result.PageIndex = pindex;
            result.PageSize = psize;

            string query = @"   SELECT DISTINCT [Clip].* FROM [clip]
                                LEFT JOIN	    [Cut]            ON [Cut].[IdClip] = [Clip].[Id]
                                LEFT JOIN    	[Video] AS [V]   ON   [V].[Id]     =  [Cut].[IdVideo]
                                WHERE	   ([V].[IdChannel]  = @IdChannel OR @IdChannel IS NULL)
                                AND		([Clip].[Status]     = @Status OR @Status IS NULL)
                                AND		([Clip].[CreatedAt] >= @CreateAt OR @CreateAt IS NULL)
                                ORDER BY [Clip].[Id] DESC
                                OFFSET @Psize * @Pindex ROWS FETCH NEXT @Psize ROWS ONLY;";

            string qcount = @"  SELECT COUNT(DISTINCT [Clip].[Id]) FROM [clip]
                                LEFT JOIN	    [Cut]            ON [Cut].[IdClip] = [Clip].[Id]
                                LEFT JOIN    	[Video] AS [V]   ON   [V].[Id]     =  [Cut].[IdVideo]
                                WHERE	   ([V].[IdChannel]  = @IdChannel OR @IdChannel IS NULL)
                                AND		([Clip].[Status]     = @Status OR @Status IS NULL)
                                AND		([Clip].[CreatedAt] >= @CreateAt OR @CreateAt IS NULL)";

            var count = this.Context.ExecuteScalar(qcount, filter);

            result.Total = Convert.ToInt32(count);
            result.Result = this.Context.Query<Clip>(query, filter);
            result.Result.ToList().ForEach(o => o.SocialMedias = GetSocialMedias(o.Id));

            return result;
        }

        public void UpdateStatus(int idclip, int idstatus)
        {
            base.Context.Execute("UPDATE [Clip] SET [Status] = @idstatus WHERE [Id] = @idclip", new { idclip, idstatus });
        }

        private IEnumerable<ClipSocialMedia> GetSocialMedias(int clipid)
        {
            string query = @"SELECT [CSM].*, [SC].[SocialMedia] FROM [SocialMedia] AS [SM]
                             INNER JOIN [ClipSocialMedia]   AS [CSM] ON [CSM].[IdSocialMedia] =  [SM].[Id]
                             INNER JOIN [Clip]              AS [C]   ON   [C].[Id]            = [CSM].[IdClip]
                             INNER JOIN [SocialMedia]       AS [SC]  ON  [SC].[Id]            = [CSM].[IdSocialMedia]
                             WHERE c.id = @clipid";

            return base.Context.Query<ClipSocialMedia>(query, new { clipid });
        }
    }
}