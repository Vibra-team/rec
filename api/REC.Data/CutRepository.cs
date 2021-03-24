using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Options;
using REC.Data.Contracts;
using REC.Model;
using System;
using System.Collections.Generic;

namespace REC.Data
{
    public class CutRepository : BaseRepository, ICutRepository
    {
        public CutRepository(IOptions<ConnOptions> config): base(config) { }

        public void Add(IEnumerable<Cut> cuts)
        {
            this.Context.Insert<IEnumerable<Cut>>(cuts);
        }
    }
}
