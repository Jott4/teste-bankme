import { useEffect } from "react";

import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    const localstore = localStorage.getItem("@bankme/user");

    if (localstore) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, []);

  return <div />;
};

export default Index;
