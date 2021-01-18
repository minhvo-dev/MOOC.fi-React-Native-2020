import { useMutation } from "@apollo/react-hooks";

import { CREATE_USER } from "../graphql/mutations";

const useCreateUser = () => {
  const [createUser_, result] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log(error);
    }
  });

  const createUser = async ({ username, password }) => {
    const { data } = await createUser_({
      variables: {
        username,
        password
      }
    });

    return data;
  };

  return [createUser, result];
};

export default useCreateUser;