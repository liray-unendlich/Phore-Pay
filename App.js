import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import QRCode from "qrcode.react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "未取得",
      qr:"",
      qr_enable: 0
    };
  }

  /* CoingeckoよりPhoreのJPY建て価格をfetch */
  handlePrice() {
    axios({
      url: "https://api.coingecko.com/api/v3/simple/price?ids=phore&vs_currencies=jpy",
      method: "get"
    }).then((res) => {
      this.setState({
        price: res.data.phore.jpy
      });
    }, ).catch(() => {
      console.log("通信失敗");
    });
  }

  /* QRコードの生成 */
  generateQr(fee, addr, bill) {
    this.handlePrice();
    const total = bill / this.state.price + fee;
    const message = "./withdraw phr "+total+" "+addr;
    const txt = "twitter://post?message=" + encodeURIComponent(message);
    this.setState({
      qr: txt
    });
  }

  /* QRコードの読み取り */
  readQr() {

  }

  /* カメラの起動 */
  handleCamera() {

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>1PHR={this.state.price}円</p>
        <button onClick={() => {this.handlePrice()}}>テスト</button>
        <button onClick={() => this.setState({qr_enable: 100})}>QR生成</button>
        <QRCode value={this.state.qr} size={this.state.qr_enable} />
      </div>
    );
  }
}

export default App;
