using VidApi.Context;

namespace VidApi.Helpers
{
    public class Helper
    {
        public static readonly PostgresContext Database = new PostgresContext();
    }
}
