using Microsoft.Extensions.Options;
using Dapper;
using Dapper.Contrib.Extensions;
using REC.Data.Contracts;
using REC.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REC.Data
{
    public class ClipSocialMediaRepository : BaseRepository, IClipSocialMediaRepository
    {
        public ClipSocialMediaRepository(IOptions<ConnOptions> config) : base(config) { }

        /// <summary>
        /// Add a new ClipSocialMedia if it doesn't exists.
        /// </summary>
        /// <param name="medias">List of ClipSocialMedia</param>
        public void Add(IEnumerable<ClipSocialMedia> medias)
        {
            IEnumerable<ClipSocialMedia> result = new List<ClipSocialMedia>();

            string cmd = @"
                    BEGIN
                    IF NOT EXISTS
                        (
                            SELECT [IdClip] FROM [ClipSocialMedia]
                            WHERE [IdClip] = @IdClip AND [IdSocialMedia] = @IdSocialMedia
                        )
                        BEGIN
                            INSERT INTO [ClipSocialMedia] ([IdClip], [IdSocialMedia], [Status], [Link], [Monetize])
                            VALUES (@IdClip, @IdSocialMedia, 0, NULL, @Monetize)
                        END
                    END;";

            medias.ToList().ForEach(m => { base.Context.Execute(cmd, m); });
        }

        /// <summary>
        /// Gets all ClipSocialMedia by a given ClipId
        /// </summary>
        /// <param name="IdClip">Clip Identification Id</param>
        /// <returns></returns>
        public IEnumerable<ClipSocialMedia> Get(int IdClip)
        {
            string query = "SELECT * FROM [ClipSocialMedia] WHERE [IdClip] = @IdClip";

            return Context.Query<ClipSocialMedia>(query, new { IdClip });
        }
    }
}
