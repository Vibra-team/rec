using REC.Model;
using REC.Model.Filters;
using System.Collections.Generic;

namespace REC.Service.Contracts
{
    public interface IClipService
    {
        Clip Add(Clip clip, string author);

        Clip Get(int id);

        Page<Clip> Get(int pindex, int psize, ClipFilter filter);

        string Download(int idclip);

        string Upload(int idclip);

        void UpdateStatus(int idclip, int idstatus);
    }
}
