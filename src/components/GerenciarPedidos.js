import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Popover, message, Select } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import api from "../utils/config";
import { useDispatch, useSelector } from "react-redux";
import StyledSpinner from "../utils/StyledSpinner";
import { getOpenOrders, updateOrder, deleteOrder } from "../actions/Orders";

import useSound from "use-sound";
import bell from "../assets/bell.mp3";

const { Option } = Select;
const collator = new Intl.Collator("pt-BR", {
  usage: "search",
  sensitivity: "base",
});
const comparar = (a, b) => {
  if (a === b) return 0;
  if (a === undefined || a === null) return 1;
  if (b === undefined || b === null) return -1;
  return collator.compare(a, b);
};
const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    // playing ? audio.play() : audio.pause();
    audio.play();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const GerenciarPedidos = (props) => {
  const orders = useSelector((state) => state.orders.orders?.results);
  const count = useSelector((state) => state.orders.orders?.count);
  const moreData = useSelector((state) => state.orders?.moreData);
  const isLoading = useSelector((state) => state.orders?.isLoading);
  const audio = new Audio(bell);
  const [time, setTime] = React.useState(0);
  const [playing, toggle] = useAudio(props.url);
  const [idsSelecionados, setIdSelecionados] = useState([]);
  const [idOrder, setIdOrder] = useState(0);
  const [status, setStatus] = useState("");
  const [filtros, setFiltros] = useState({ ativo: [true] });
  const [carregandoExcluir, setCarregandoExcluir] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);
  useEffect(() => {
    console.log("moreData, count", moreData, count);
    if (moreData) {
      toggle(true);
      message.info("TEMOS NOVO PEDIDO!");
    }
  }, [count, moreData]);
  useEffect(() => {
    dispatch(getOpenOrders());

    const timer = setInterval(() => {
      setTime(time + 1);
      dispatch(getOpenOrders());
    }, 60000);
    return () => {
      clearTimeout(timer);
    };
  }, [time]);

  const onUpdateOrder = (id, value) => {
    const orderData = {
      status: value,
    };
    dispatch(updateOrder(orderData, id));
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
      render: (text, record) => (
        <Link to={`/aluno/${record.profile_id}`}>{text}</Link>
      ),
      sorter: (a, b) => {
        return comparar(a.nome, b.nome);
      },
    },
    {
      title: "Pedido",
      dataIndex: "food_name",
      key: "food_name",
      render: (text, record) => {
        console.log("text", text);
        console.log("record", record);
        const content = (
          <div>
            <p>Pizza(s)</p>
            {record.lista_pizza?.map((r) => {
              return (
                <div key={r.id}>
                  <small>
                    Tamanho: {r.tamanho} CM -- Borda: {r.borda}
                  </small>
                  <ul style={{ flexDirection: "column" }}>
                    {r.sabores.map((s) => (
                      <li key={s}>
                        <small>{s}</small>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            <p>Bebida(s)</p>
            <ul>
              {record.lista_bebida?.map((r) => (
                <li key={r.item}>
                  <small>
                    {r.quantidade} - {r.item}
                  </small>
                </li>
              ))}
            </ul>
            <p>Observações</p>
            <small>{record.observacao}</small>
          </div>
        );
        return (
          <Popover content={content} title="Pedido" trigger="hover">
            <Button>Passe o mouse</Button>
          </Popover>
        );
      },
    },

    {
      title: "Telefone",
      dataIndex: "fone",
      key: "fone",
      render: (text, record) => <p>{text}</p>,
    },
    {
      title: "Endereço",
      dataIndex: "endereco",
      key: "endereco",
      render: (text, record) => <p>{text}</p>,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text, record) => <h3>R$ {text.toFixed(2)}</h3>,
    },
    {
      title: "Pagamento",
      dataIndex: "payment_type",
      key: "payment_type",
      render: (text, record) => <p>{text}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Select
          showSearch
          style={{ width: 200 }}
          defaultValue={text}
          placeholder="Status"
          optionFilterProp="children"
          onChange={(value) => {
            onUpdateOrder(record.id, value);
          }}
          // onFocus={onFocus(record.id)}
          // onBlur={}
          // onSearch={}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="Aberto">Aberto</Option>
          <Option value="Recebido">Recebido</Option>
          <Option value="Saiu pra entrega">Saiu pra entrega</Option>
          <Option value="Finalizado">Finalizado</Option>
          <Option value="Pizza no forno">Pizza no forno</Option>
        </Select>
      ),
      sorter: (a, b) => {
        return comparar(a.status, b.status);
      },
    },
  ];

  return (
    <div>
      <div>
        <h2 style={{ textAlign: "center" }}> Pedidos em andamento</h2>
        <div style={{ padding: "10px" }}>
          <Table
            filterDropdownVisible
            style={{ background: "white" }}
            size="middle"
            rowKey="id"
            showHeader
            pagination={{ position: "both" }}
            columns={columns}
            loading={{
              spinning: isLoading,
              indicator: <StyledSpinner />,
            }}
            dataSource={orders}
            // rowClassName={handleLinhaClassName}
          />
        </div>
      </div>
    </div>
  );
};
export default GerenciarPedidos;
