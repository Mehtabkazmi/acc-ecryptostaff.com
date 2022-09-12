import React from "react";
import Qr from "components/common/qr";
import { copyTextById, formateZert } from "common";
import useTranslation from "next-translate/useTranslation";

const DepositTab = ({ response, TurnoffSetShow }: any) => {
  const { t } = useTranslation("common");
  return (
    <div className={`asset-balances-right visible`}>
      <div className={`box-one single-box visible`}>
        <div className="section-wrapper">
          <div className="deposit-info-area" id="wallet_deposit_area">
            <div className="deposit-info-top">
              <div className="balance-box">
                <img
                  className="icon"
                  src={response?.deposit?.coin_icon || "/bitcoin.png"}
                  alt="coin"
                />
                <div className="balance-content">
                  <h4>
                    {response?.deposit?.coin_type} {t("Balance")}
                  </h4>
                  <h5>
                    {response?.deposit?.coin_type} {t("Wallet")}
                  </h5>
                </div>
              </div>
              <a
                href="#"
                className="close-btn"
                onClick={() => {
                  TurnoffSetShow();
                }}
              >
                <i className="fa fa-times" />
              </a>
            </div>
            <div className="total-balance">
              <div className="total-balance-left">
                <h3>{t("Total Balance")}</h3>
              </div>
              <div className="total-balance-right">
                <h3>
                  {formateZert(response?.deposit?.balance)}
                  {response?.deposit?.coin_type}
                </h3>
              </div>
            </div>

            <div className="address-area">
              <div className="address-area-info">
                <h3 className="text-white">
                  Address
                  <i
                    className="fa fa-exclamation-triangle ml-2"
                    aria-hidden="true"
                  ></i>
                </h3>
                <p className="text-white">
                  {t("Only send")} {response?.deposit?.coin_type}{" "}
                  {t("to this address.")}
                  {t(
                    "Sending any other asset to this address may result in the loss of your deposit!"
                  )}
                </p>
              </div>
              <div className="input-url">
              <span className="text-muted">Show me how to change wallet id deposit</span>
                <input
                  type="url"
                  className="form-control"
                  id="url"
                  defaultValue={response?.address}
                  value={response?.amount}
                  // readOnly
                />
                <button
                  type="button"
                  className="btn copy-url-btn"
                  onClick={() => {
                    copyTextById("url");
                  }}
                >
                  <i className="fa fa-clone"></i>
                </button>
              </div>
              <div className="bar-code-area">
                {response?.address && <Qr value={response?.address} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositTab;
