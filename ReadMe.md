

API: 65fd44fa012e778f220d1e1c8f8dd0f2642fb87d

http://api-public.guidebox.com/v2/sources?api_key=65fd44fa012e778f220d1e1c8f8dd0f2642fb87d&type=free&filter=movie

Find movie:

http://api-public.guidebox.com/v2/search?api_key=65fd44fa012e778f220d1e1c8f8dd0f2642fb87d&type=movie&field=title&query=Terminator

multiple ids => total_results = "4"

if multiple ids which one specifically:

splash id = 59597 

sources for splash:

http://api-public.guidebox.com/v2/movies/59597?api_key=65fd44fa012e778f220d1e1c8f8dd0f2642fb87d


App steps:

1) select movie = enter movie title
2) retrieve possible matches
3) present matches to user
4) Identify correct movi seelction
5) retrieve movie id
6) retrive sources
7) present sources  
    - free
    - rental
    - purchase