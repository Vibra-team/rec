using REC.Model;
using System.Collections.Generic;

namespace REC.Data.Contracts
{
    public interface ICutRepository
    {
        void Add(IEnumerable<Cut> cuts);
    }
}
