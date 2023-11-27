import r2wc from "@r2wc/react-to-web-component";
import Login from "./components/Login";
import Modal1 from "./components/Modal1";
import { CustomModalWrapper } from "./components/templates/CustomWrapperR2WC";

const R2WCModal1 = r2wc(() => (
  <CustomModalWrapper>
    <Modal1 />
  </CustomModalWrapper>
));

const R2WCLogin = r2wc(
  () => (
    <CustomModalWrapper>
      <Login />
    </CustomModalWrapper>
  ),
  {
    props: {
      open: "boolean",
    },
  }
);

customElements.define("r2wc-modal1", R2WCModal1);
customElements.define("r2wc-login", R2WCLogin);
