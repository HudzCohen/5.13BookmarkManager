using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookmarkManager.Data
{
    public class BookmarkRepo
    {
        private string _connectionString;

        public BookmarkRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddBookmark(Bookmark bookmark)
        {
            using var ctx = new BookmarkDataContext(_connectionString);
            ctx.Bookmarks.Add(bookmark);
            ctx.SaveChanges();
        }

        public List<Bookmark> GetBookmarks(int id)
        {
            using var ctx = new BookmarkDataContext(_connectionString);
            return ctx.Bookmarks.Where(b => b.UserId == id).ToList();
        }

        public void DeleteBookmark(int id)
        {
            using var ctx = new BookmarkDataContext(_connectionString);
            ctx.Bookmarks.Remove(ctx.Bookmarks.FirstOrDefault(b => b.Id == id));
            ctx.SaveChanges();
        }

        public void UpdateBookmark(Bookmark bookmark)
        {
            using var ctx = new BookmarkDataContext(_connectionString);
            ctx.Bookmarks.Update(bookmark);
            ctx.SaveChanges();
        }

        public List<PopularBookmark> GetPopularBookmarks()
        {
            using var ctx = new BookmarkDataContext(_connectionString);
            List<PopularBookmark> result = ctx.Bookmarks.GroupBy(b => b.Url)
                .OrderByDescending(g => g.Count())
                .Select(g => new PopularBookmark { Url = g.Key, ValueOccurence = g.Count() })
                .Take(5).ToList();
            return result;
        }
    }
}
