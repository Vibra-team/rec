using System.Collections.Generic;

namespace REC.Data.Contracts
{
    interface IBaseContract<T>
    {
        T Get(int id);

        IEnumerable<T> Get();

        int Add(T payload);

        bool Update(T payload);
    }
}
