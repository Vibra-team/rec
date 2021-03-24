using REC.Model;
using REC.Model.Filters;

namespace REC.Data.Contracts
{
    public interface IClipRepository
    {
        Clip Add(Clip clip);

        Clip Get(int id);

        Page<Clip> Get(int pindex, int psize, ClipFilter filter);

        string Download(int idclip);

        void UpdateStatus(int idclip, int idstatus);
    }
}
