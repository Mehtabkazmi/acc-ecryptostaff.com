import { formateZert } from "common";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import {
  buyLimitAppAction,
  initialDashboardCallAction,
  initialDashboardCallActionWithToken,
} from "state/actions/exchange";

const Limit = ({
  dashboard,
  buySellLimitCoinData,
  setBuySellLimitCoinData,
  isLoggedIn,
  currentPair,
}: any) => {
  const { t } = useTranslation("common");
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
 
  const setAmountBasedOnPercentage = (percentage: any) => {
    const { maker_fees, taker_fees } = dashboard.fees_settings;
    const amount =
      parseFloat(dashboard?.order_data?.total?.base_wallet?.balance) /
      parseFloat(buySellLimitCoinData.price);
    const feesPercentage =
      parseFloat(maker_fees) > parseFloat(taker_fees)
        ? parseFloat(maker_fees)
        : parseFloat(taker_fees);
    const total = amount * percentage * parseFloat(buySellLimitCoinData.price);
    const fees = (total * feesPercentage) / 100;
    setBuySellLimitCoinData({
      ...buySellLimitCoinData,
      amount: (total - fees) / parseFloat(buySellLimitCoinData.price),
      total: total - fees,
    });
  };
  return (
    <div id="BuyTabContent" className="tab-content">
      <div
        id="imit"
        role="tabpanel"
        aria-labelledby="Limit-tab"
        className="tab-pane fade show active"
      >
        <div className="row">
          <div className="col-md-12">
            <div className="cp-user-profile-info">
              <form
                id="buy-form"
                style={{
                  overflow: "hidden",
                }}
              >
                <input
                  type="hidden"
                  name="_token"
                  defaultValue="g2OWJq3pDqYRQmVvmGt799aCsDmkkV4UjrWDhzcF"
                />
                <div className="form-group ">
                  <div className="total-top">
                    <label>{t("Total")}</label> <label>{t("Available")}</label>
                  </div>
                  <div className="total-top-blance">
                    <div className="total-blance">
                      <span
                        className="text-warning mr-1"
                        style={{ fontWeight: 700 }}
                      >
                        <span>
                          {formateZert(
                            dashboard?.order_data?.total?.base_wallet?.balance
                          )}
                        </span>
                      </span>
                      <span
                        className="text-warning"
                        style={{ fontWeight: 700 }}
                      >
                        <span className="trade_coin_type">
                          {dashboard?.order_data?.total?.base_wallet?.coin_type}
                        </span>
                      </span>
                    </div>
                    <div className="avilable-blance">
                      <span
                        className="text-warning"
                        style={{ fontWeight: 700 }}
                      >
                        <span>
                          {" "}
                          {formateZert(
                            dashboard?.order_data?.total?.base_wallet?.balance
                          )}
                        </span>
                      </span>
                      <span
                        className="text-warning ml-1"
                        style={{ fontWeight: 700 }}
                      >
                        <span className="trade_coin_type">
                          {dashboard?.order_data?.total?.base_wallet?.coin_type}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <label className="cstmHead">{t("Price")}</label>
                  <input
                    name="price"
                    type="text"
                    placeholder="0"
                    className="form-control number_only input_1"
                    value={buySellLimitCoinData.price}
                    onChange={(e) => {
                      setBuySellLimitCoinData({
                        ...buySellLimitCoinData,
                        price: e.target.value,
                        total:
                          parseFloat(e.target.value) *
                          buySellLimitCoinData.amount,
                      });
                    }}
                  />
                  <span
                    className="text-warning blns"
                    style={{ fontWeight: 700 }}
                  >
                    <span className="trade_coin_type">
                      {dashboard?.order_data?.total?.base_wallet?.coin_type}
                    </span>
                  </span>
                </div>
                <div className="form-group mt-3">
                  <label className="cstmHead">{t("Amount")}</label>
                  <input
                    name="amount"
                    type="number"
                    placeholder="0"
                    className="form-control number_only input_2"
                    value={
                      buySellLimitCoinData.amount !== 0 &&
                      buySellLimitCoinData.amount
                    }
                    onChange={(e) => {
                      setBuySellLimitCoinData({
                        ...buySellLimitCoinData,
                        amount: e.target.value,
                        total:
                          parseFloat(e.target.value) *
                          buySellLimitCoinData.price,
                      });
                    }}
                  />
                  <span
                    className="text-warning blns"
                    style={{ fontWeight: 700 }}
                  >
                    <span className="trade_coin_type">
                      {dashboard?.order_data?.total?.trade_wallet?.coin_type}
                    </span>
                  </span>
                </div>
                <div className="form-group mt-3">
                  <label className="cstmHead">{t("Total Amount")}</label>

                  <input
                    disabled
                    name="total_amount"
                    type="text"
                    placeholder=""
                    className="form-control number_only input_3"
                    value={buySellLimitCoinData.total}
                  />
                  <span
                    className="text-warning blns"
                    style={{ fontWeight: 700 }}
                  >
                    <span className="trade_coin_type">
                      {dashboard?.order_data?.total?.base_wallet?.coin_type}
                    </span>
                  </span>
                </div>
                {isLoggedIn && (
                  <div className=" mt-3 percent-container ">
                    <span
                      className=" percent-btn col-3"
                      onClick={() => setAmountBasedOnPercentage(0.25)}
                    >
                      {t("25%")}
                    </span>
                    <span
                      className=" percent-btn col-3"
                      onClick={() => setAmountBasedOnPercentage(0.5)}
                    >
                      {t("50%")}
                    </span>
                    <span
                      className=" percent-btn col-3"
                      onClick={() => setAmountBasedOnPercentage(0.75)}
                    >
                      {t("75%")}
                    </span>
                    <span
                      className=" percent-btn col-3"
                      onClick={() => setAmountBasedOnPercentage(1)}
                    >
                      {t("100%")}
                    </span>
                  </div>
                )}

                {!isLoggedIn ? (
                  <div className="form-group mt-4">
                    <Link href="/authentication/signin">
                      <a className="btn btn-danger">{t("Login")}</a>
                    </Link>
                  </div>
                ) : loading ? (
                  <div className="form-group mt-4">
                    <button type="submit" className="btn theme-btn">
                      <span v-if="limitBuyData.placingOrder">
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        {t("Placing Order...")}
                      </span>
                      <span v-else="">{t("Buy")} </span>
                    </button>
                  </div>
                ) : (
                  <div className="form-group mt-4">
                    <button
                      type="submit"
                      className="btn theme-btn"
                      onClick={async (e) => {
                        e.preventDefault();
                        await buyLimitAppAction(
                          buySellLimitCoinData.amount,
                          buySellLimitCoinData.price,
                          dashboard?.order_data?.trade_coin_id,
                          dashboard?.order_data?.base_coin_id,
                          setLoading,
                          setBuySellLimitCoinData
                        );
                        await dispatch(
                          initialDashboardCallAction(currentPair, dashboard)
                        );
                      }}
                    >
                      <span v-else="">{t("Place Order")}</span>
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Limit;
