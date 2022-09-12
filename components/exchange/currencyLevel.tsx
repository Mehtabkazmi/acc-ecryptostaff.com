import useTranslation from "next-translate/useTranslation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "state/store";

const CurrencyLevel = () => {
  const { t } = useTranslation("common");
  const { dashboard } = useSelector((state: RootState) => state.exchange);
  const [volume, setVolume] = React.useState(
    parseFloat(dashboard?.order_data?.total?.trade_wallet?.volume) *
      parseFloat(dashboard?.order_data?.total?.trade_wallet?.last_price)
  );

  useEffect(() => {
    setVolume(
      parseFloat(dashboard?.order_data?.total?.trade_wallet?.volume) *
        parseFloat(dashboard?.order_data?.total?.trade_wallet?.last_price)
    );
  }, [
    dashboard?.order_data?.total?.trade_wallet?.volume,
    dashboard?.order_data?.total?.trade_wallet?.last_price,
  ]);
  return (
    <div className="cxchange-summary-featured">
      <ul className="cxchange-summary-items">
        <li>
          <span
            className={
              parseFloat(
                dashboard?.last_price_data &&
                  dashboard?.last_price_data[0]?.price
              ) >=
              parseFloat(
                dashboard?.last_price_data &&
                  dashboard?.last_price_data[0]?.last_price
              )
                ? "value increase"
                : parseFloat(
                    dashboard?.last_price_data &&
                      dashboard?.last_price_data[0]?.price
                  ) <
                  parseFloat(
                    dashboard?.last_price_data &&
                      dashboard?.last_price_data[0]?.last_price
                  )
                ? "value decrease"
                : "value"
            }
          >
            {dashboard?.order_data?.total?.trade_wallet?.last_price}{" "}
            {parseFloat(
              dashboard?.last_price_data && dashboard?.last_price_data[0]?.price
            ) >=
            parseFloat(
              dashboard?.last_price_data &&
                dashboard?.last_price_data[0]?.last_price
            ) ? (
              <i className="fa-solid fa-up-long value-increaseicon ml-2"></i>
            ) : parseFloat(
                dashboard?.last_price_data &&
                  dashboard?.last_price_data[0]?.price
              ) <
              parseFloat(
                dashboard?.last_price_data &&
                  dashboard?.last_price_data[0]?.last_price
              ) ? (
              <i className="fa-solid fa-down-long value-decreaseicon ml-2"></i>
            ) : (
              ""
            )}
          </span>
          <span className="label">
            {dashboard?.last_price_data &&
              dashboard?.last_price_data[0]?.last_price}
            ({dashboard?.order_data?.base_coin})
          </span>
        </li>
        <li>
          <span className="label">{t("24h change")}</span>
          <span
            className={`value ${
              dashboard?.order_data?.total?.trade_wallet?.price_change >= 0
                ? "increase"
                : "decrease"
            }`}
          >
            {parseFloat(
              dashboard?.order_data?.total?.trade_wallet?.price_change
            )}
            %
          </span>
        </li>
        <li>
          <span className="label">{t("24h high")}</span>
          <span className="value">
            {parseFloat(
              dashboard?.order_data?.total?.trade_wallet?.high
            ).toFixed(3)}
          </span>
        </li>
        <li>
          <span className="label">{t("24h Low")}</span>
          <span className="value">
            {parseFloat(
              dashboard?.order_data?.total?.trade_wallet?.low
            ).toFixed(3)}
          </span>
        </li>
        <li>
          <span className="label">
            {" "}
            {t("24h volume")}({dashboard?.order_data?.trade_coin}){" "}
          </span>
          <span className="value">
            {parseFloat(dashboard?.order_data?.total?.trade_wallet?.volume)}
          </span>
        </li>
        <li>
          <span className="label">
            {" "}
            {t("24h volume")}({dashboard?.order_data?.base_coin}){" "}
          </span>
          <span className="value">{volume.toFixed(8)}</span>
        </li>
      </ul>
    </div>
  );
};

export default CurrencyLevel;
