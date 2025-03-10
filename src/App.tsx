import { type ReactNode, useEffect, useState } from 'react';
import { get } from "./util/http";

import BlogPosts, { type BlogPost } from './components/BlogPosts';
import ErrorMessage from './components/ErrorMessage';

import fetchingImg from './assets/data-fetching.png';

type RawDataBlogPost = {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function App() {
  const [fetchedPosts, setFetchedPOsts] = useState<BlogPost[] | undefined>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);

     try {
      const data = (await get(
        'https://jsonplaceholder.typicode.com/posts'
      )) as RawDataBlogPost[];

      const blogPosts: BlogPost[] = data.map(rawPost => {
        return {
          id: rawPost.id,
          title: rawPost.title,
          text: rawPost.body
        }
      })

      setFetchedPOsts(blogPosts);
     } catch(error) {
      if (error instanceof Error) {
        setError(error.message);
      }
     }

      setIsFetching(false);
    }

    fetchPosts();
  }, []);

  return (
    <main>
      <img src={fetchingImg} alt="An abstract image depicting a data fetching process." />
      {isFetching && <p id="loading-fallback">Fetching posts...</p>}
      {fetchedPosts && <BlogPosts posts={fetchedPosts} />}
      {error && <ErrorMessage text={error} />}
    </main>
  )
}

export default App;
