import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Main({ user }) {
  if (!user)
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  return (
    <div>
      <h1>Hello {user.name}</h1>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
