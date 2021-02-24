import { useState, useEffect } from "react";
import api from "../../service/http";
import { Container, Box } from "@chakra-ui/react";
import ModalInsertFiles from "../../components/ModalInsertFiles";
import TableNFE from "../../components/TableNFE";
import SkeletonTable from "../../components/SkeletonTable";
import { useRouter } from "next/router";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<any>();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const userData = localStorage.getItem("@bankme/user") || "";
    if (!userData) {
      alert("Seu token expirou, por favor, faça login novamente");
      router.push("/login");
    } else {
      const objectUserData = JSON.parse(userData);
      setUserEmail(objectUserData.email);

      //get user Nf-e
      api
        .get("/nfe", {
          params: {
            userId: objectUserData.userId,
          },
          headers: {
            Authorization: objectUserData.token,
          },
        })
        .then(
          (res) => {
            console.log(res);
            res.data.nfes.map((item: any) => {
              console.log(item)
              let formattedDate = new Date(item.emissionDate).toLocaleString();
              item.emissionDate = formattedDate;

              setData((data: any) => [...data, item]);
            });

            setLoading(false);
          },
          (err) => {
            console.log(err);
            setLoading(false);
          }
        );
    }
  }, []);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const handleData = (formattedXMLArray: any) => {
    const localData = JSON.parse(localStorage.getItem("@bankme/user") || "");
    formattedXMLArray.map((item: any) => {
      item.userId = localData.userId;
      api
        .post("/nfe", item, {
          headers: {
            Authorization: localData.token,
          },
        })
        .then(
          (res: any) => {
            let formattedDate = new Date(
              res.data.nfe.emissionDate
            ).toLocaleString();
            res.data.nfe.emissionDate = formattedDate;

            setData((data: any) => [...data, res.data.nfe]);
          },
          (err) => {
            console.log(err);
            //alert("Seu token expirou, faça login novamente");
            //router.push("/login");
          }
        );
    });
  };
  return (
    <>
      <Container
        pt={5}
        maxW="75vw"
        centerContent
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ gap: "15px" }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          w="100%"
        >
          <ModalInsertFiles handle={handleData} userEmail={userEmail} />
        </Box>

        {loading ? <SkeletonTable /> : <TableNFE data={data} />}
      </Container>
    </>
  );
};

export default Dashboard;
