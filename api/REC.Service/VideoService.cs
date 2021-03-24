using REC.Data.Contracts;
using REC.Model;
using REC.Service.Contracts;
using System;

namespace REC.Service
{
    public class VideoService : IVideoService
    {
        public readonly IVideoRepository repo;

        public VideoService(IVideoRepository repo)
        {
            this.repo = repo;
        }

        public PaginatedResult<Video> Get(int idchannel, DateTime start)
        {
            return this.repo.Get(idchannel, start);
        }

        public PaginatedResult<Video> Get(int idchannel)
        {
            return this.repo.Get(idchannel);
        }

        public PaginatedResult<Video> Get(int idchannel, int id)
        {
            return this.repo.Get(idchannel, id);
        }
    }
}
