import { Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Cookies from "js-cookie";
import * as React from "react";
import { useMutation } from "react-query";
import authService from "../../services/AuthServices";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Login() {
  // Mutation para realizar o login
  const loginMutation = useMutation(authService.login);

  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
  });

  const handleLogin = async (username: string, password: string) => {
    try {
      await loginMutation.mutate({ username, password });

      // Após o login bem-sucedido, defina o token JWT no cookie e no estado global do react-query
      Cookies.set("accessToken", loginMutation.data, {
        httpOnly: true,
        expires: 1,
      });

      const event = new CustomEvent("userLoggedIn", {
        detail: { isAuthenticated: true },
      });
      dispatchEvent(event);

      localStorage.setItem("name", "usuario");
    } catch (error) {
      console.log("Erro ao se autenticar");
    }
  };
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Função para fechar e abrir o modal
  window.clickModal = handleClick;

  return (
    <Dialog
      id={"dialog-mui"}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Login"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} width={400} padding={"20px 0px"}>
          <TextField
            label="Nome"
            id="outlined-size-small"
            size="small"
            onChange={(e) =>
              setCredentials({ ...credentials, username: e?.target?.value })
            }
          />
          <TextField
            type="password"
            label="Senha"
            id="outlined-size-small"
            size="small"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e?.target?.value })
            }
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() =>
            handleLogin(credentials?.username, credentials?.password)
          }
          variant="contained"
        >
          ENTRAR
        </Button>
      </DialogActions>
    </Dialog>
  );
}
