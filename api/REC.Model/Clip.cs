using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;

namespace REC.Model
{
    [Table("Clip")]
    public class Clip : Base
    {
        public int? IdCampaign { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Tags { get; set; }

        public string Thumbnail { get; set; }

        public int? Status { get; set; }

        /// <summary>
        /// User name registered in AD
        /// </summary>
        public string Author { get; set; }

        /// <summary>
        /// File size in seconds
        /// </summary>
        /// <example>120.5 (120 seconds and 50 thousandths)</example>
        public decimal Length { get; set; }

        /// <summary>
        /// Indicates when a clip should be treated as a GIF
        /// </summary>
        public bool? Gif { get; set; }

        /// <summary>
        /// Size of file in bytes
        /// </summary>
        /// <example>386.252 bytes (377 KB)</example>
        public int? Size { get; set; }

        /// <summary>
        /// Optional date on which the clip should be sent to the social network
        /// </summary>
        public DateTime? SchedulingDate { get; set; }

        public string AspectRatio { get; set; }

        /// <summary>
        /// Indicates whether the clip was uploaded by a user
        /// </summary>
        public bool? UploadedByUser { get; set; }

        /// <summary>
        /// Stores information used to edit a clip's cuts
        /// </summary>
        [Computed]
        public IEnumerable<Cut> Cuts { get; set; }

        /// <summary>
        /// List of social networks where the clip will be published
        /// </summary>
        [Computed]
        public IEnumerable<ClipSocialMedia> SocialMedias { get; set; }

        /// <summary>
        /// Store the name of clip if it was uploaded by user
        /// </summary>
        [Computed]
        public string UploadedFile { get; set; }
    }
}
