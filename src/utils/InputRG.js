import { Input } from "antd";
import React from "react";

const numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function Rg(v) {
  if (v?.length) {
    v = v.replace(/\D/g, "");
    v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4");
    return v;
  } else return null;
}
class InputRG extends React.Component {
  state = { value: "" };

  setValueFromProp = v => {
    const value = Rg(v) ?? "";
    if (this.state.value === value) return;
    this.setState({ value });
  };

  setPropFromValue = async value => {
    const v = value?.replace(/\D+/g, "");
    if (this.props.value === v) return;
    await this.props.onChange(v);
  };

  handleKeyDown = async e => {
    switch (e.which) {
      case 9:
      case 13:
      case 27:
      case 35:
      case 36:
      case 37:
      case 39:
        return;
      // backspace
      case 8: {
        e.preventDefault();
        const { target } = e;
        let valor = target.value;
        if (target.selectionStart === target.selectionEnd) {
          let i;
          for (i = target.selectionStart - 1; i >= 0; i--) {
            if (numeros.includes(valor[i])) break;
          }
          valor = valor.slice(0, i) + valor.slice(target.selectionStart);
          await this.setPropFromValue(valor);
          target.selectionStart = i;
          target.selectionEnd = i;
        } else {
          const { selectionStart } = target;
          valor =
            valor.slice(0, selectionStart) + valor.slice(target.selectionEnd);
          await this.setPropFromValue(valor);
          target.selectionStart = selectionStart;
          target.selectionEnd = selectionStart;
        }
        return;
      }
      // delete
      case 46: {
        e.preventDefault();
        const { target } = e;
        let valor = target.value;
        if (target.selectionStart === target.selectionEnd) {
          let i;
          for (i = target.selectionStart; i < valor.length; i++) {
            if (numeros.includes(valor[i])) break;
          }
          valor = valor.slice(0, target.selectionStart) + valor.slice(i + 1);
          await this.setPropFromValue(valor);
          target.selectionStart = i;
          target.selectionEnd = i;
        } else {
          const { selectionStart } = target;
          valor =
            valor.slice(0, selectionStart) + valor.slice(target.selectionEnd);
          await this.setPropFromValue(valor);
          target.selectionStart = selectionStart;
          target.selectionEnd = selectionStart;
        }
        return;
      }
    }

    if (e.ctrlKey || numeros.includes(e.key)) return;

    e.preventDefault();
  };

  handleChange = async e => {
    const { target } = e;
    let { selectionStart } = target;
    await this.setPropFromValue(e.target.value);
    switch (selectionStart) {
      case 4:
      case 8:
      case 12:
        selectionStart++;
        break;
    }
    target.selectionStart = selectionStart;
    target.selectionEnd = selectionStart;
  };

  componentDidMount() {
    this.setValueFromProp(this.props.value);
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setValueFromProp(this.props.value);
    }
  }

  render() {
    const { size, prefix, suffix, disabled } = this.props;

    return (
      <Input
        value={this.state.value}
        placeholder="RG"
        size={size}
        prefix={prefix}
        suffix={suffix}
        disabled={disabled}
        maxLength={14}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        style={{ maxWidth: "200px" }}
      />
    );
  }
}

export default InputRG;
