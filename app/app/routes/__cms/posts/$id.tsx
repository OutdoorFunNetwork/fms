import { RouteData } from '@remix-run/react/routeData';
import { FC, FormEvent, useState } from 'react';
import { Form, json, LoaderFunction, MetaFunction, useLoaderData, useSubmit } from 'remix';
import invariant from 'tiny-invariant';
import Markdwn from '~/components/Markdwn/Markdwn';
import { Post } from '~/utils/models/Post';
import { findById } from '~/utils/services/posts.service';

export const meta: MetaFunction = ({ data, parentsData }: { data: Post, parentsData: RouteData }) => {
  if (!data) {
    return {
      title: `Not Found | ${ parentsData.root.baseTitle }`,
    }
  }

  return {
    title: `${ data.title} | ${ parentsData.root.baseTitle }`,
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, 'The post slug is required.');

  const postId = parseInt(params.id, 10);
  const post = await findById(postId);

  if (post == null) {
    throw new Response('Not found', {
      status: 404,
    });
  }

  return post;
}

const EditPost: FC = () => {
  const submit = useSubmit();
  const postData: Post = useLoaderData();
  const [post, setPost] = useState<Post>(postData);

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    const target = e.target as HTMLInputElement;
    const value = {
      [target.name]: target.value,
    };

    setPost({
      ...postData,
      ...value,
    });
  };

  const handleFormChange = (e: any) => {
    e.preventDefault();
    console.log(post);
  };

  return (
    <div className="post__wrapper">
      <form method="post" onSubmit={handleFormChange} className="postForm">
        <div>
          <label htmlFor="title">Post Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            className="postForm__title"
            value={post.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="body">Post Body</label>
          <Markdwn body={post.body} />
          {/* <textarea
            id="body"
            name="body"
            className="postForm__body"
            defaultValue={post.body}
          ></textarea> */}
        </div>
      </form>
      <aside className="post__sidebar">
        <h2>Post status</h2>
        Draft probably
      </aside>
    </div>
  )
};

export default EditPost;
