import React, { useState, useEffect } from "react";
import { Layout, Menu, Icon, Dropdown, Badge, Modal, Button } from "antd";
import logobranca from "../assets/logobranca.png";
import logopreta from "../assets/logo.jpg";
import { logout } from "../actions/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Axios from "axios";
import api from "../utils/config";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const Dashboard = ({ logout, auth, children }) => {
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [conteudo, setConteudo] = useState(1);
  const [aniversariantes, setAniversariantes] = useState([]);
  const [count, setCount] = useState(0);

  const handleMenuClick = (e) => {
    if (e.key === "3") {
      setMenuVisible(false);
    }
  };
  const showModal = () => {
    setVisible(true);
  };
  const handleVisibleChange = (flag) => {
    setMenuVisible(flag);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleOk = () => {
    setVisible(false);
  };

  let content;

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Config.</Menu.Item>
      <Menu.Item key="3" onClick={() => logout()}>
        Deslogar
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout style={{ height: "100vh" }}>
      {/* <Modal
        title="Vertically centered modal dialog"
        centered
        visible={modal2Visible}
        onOk={() => setModal2Visible(false)}
        onCancel={() => setModal2Visible(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal> */}
      <Header
        style={{
          display: "flex",
          background: "black",
          justifyContent: "space-between",
        }}
      >
        <div style={{ color: "white", display: "flex" }}>
          <img
            style={{ width: "50px", height: "auto", marginRight: "5px" }}
            src={logopreta}
          />
        </div>
        <p style={{ color: "white" }}>PIZZA DEL CAPO</p>

        <Dropdown
          overlay={menu}
          onVisibleChange={handleVisibleChange}
          visible={menuVisible}
          theme="dark"
        >
          <a className="ant-dropdown-link" style={{ color: "white" }} href="#">
            {auth.user?.first_name} <Icon type="down" />
          </a>
        </Dropdown>
        {/* <div style={{ color: "white" }}>Logo</div>
        <div style={{ color: "white" }}>
          <div onClick={() => efetuarLogout()}>Logout</div>
        </div> */}
      </Header>
      <Layout>
        <Sider style={{ background: "black" }}>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="vertical"
            theme={theme}
          >
            <Menu.Divider></Menu.Divider>
            <Menu.ItemGroup title="Pedidos">
              <Menu.Item key="3">
                <Link to="/add-orders">
                  <Icon type="folder-add" />
                  Add Pedidos
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/gerenciar-pedidos">
                  <Icon type="folder-add" />
                  Gerenciar Pedidos
                </Link>
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.Divider></Menu.Divider>
            <Menu.ItemGroup title="Itens">
              <Menu.Item key="22">
                <Link to="/cadastrar-item">
                  <Icon type="plus" />
                  Cadastrar Item
                </Link>
              </Menu.Item>

              <Menu.Item key="23">
                <Link to="/cadastrar-venda">
                  <Icon type="barcode" />
                  Cadastrar Venda
                </Link>
              </Menu.Item>
              <Menu.Item key="24">
                <Link to="/gerenciar-itens">
                  <Icon type="ordered-list" />
                  Gerenciar Itens
                </Link>
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.Divider></Menu.Divider>
            {auth?.user?.is_superuser && (
              <Menu.ItemGroup title="Financeiro">
                <Menu.Item key="6">
                  <Link to="/resumo-mensal">
                    <Icon type="rise" />
                    Resumo Mensal
                  </Link>
                </Menu.Item>
              </Menu.ItemGroup>
            )}
          </Menu>
        </Sider>
        <Content style={{ width: "100%", margin: "3px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Dashboard);
