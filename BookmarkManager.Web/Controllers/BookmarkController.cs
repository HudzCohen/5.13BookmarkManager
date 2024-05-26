using BookmarkManager.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace BookmarkManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private readonly string _connectionString;

        public BookmarkController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Authorize]
        [HttpPost("addbookmark")]
        public void Add(Bookmark bookmark)
        {
            var userRepo = new UserRepo(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);
            bookmark.UserId = user.Id;

            var repo = new BookmarkRepo(_connectionString);
            repo.AddBookmark(bookmark);
        }

        [Authorize]
        [HttpGet("getbookmarks")]
        public List<Bookmark> GetBookmarks()
        {
            var userRepo = new UserRepo(_connectionString);
            var user = userRepo.GetByEmail(User.Identity.Name);

            var repo = new BookmarkRepo(_connectionString);
            return repo.GetBookmarks(user.Id);
        }

        [Authorize]
        [HttpPost("deletebookmark")]
        public void DeleteBookmark(int id)
        {
            var repo = new BookmarkRepo(_connectionString);
            repo.DeleteBookmark(id);
        }

        [Authorize]
        [HttpPost("updatebookmark")]
        public void UpdateBookmark(Bookmark bookmark)
        {
            var repo = new BookmarkRepo(_connectionString);
            repo.UpdateBookmark(bookmark);
        }

        [HttpGet("getpopularbookmarks")]
        public List<PopularBookmark> GetPopularBookmarks()
        {
            var repo = new BookmarkRepo(_connectionString);
            return repo.GetPopularBookmarks();
        }

    }
}
