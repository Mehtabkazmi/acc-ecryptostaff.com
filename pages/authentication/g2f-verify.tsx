import React from "react";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { G2fVerifyAction } from "state/actions/user";
import { useDispatch } from "react-redux";
import { g2fPageRequireCheck } from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
const G2fverify = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  return (
    <div className="user-content-wrapper">
      <div className="user-form">
        <div className="right">
          <div className="form-top">
            <a className="auth-logo" href="javascript:">
              <img src="/logo.svg" className="img-fluid" alt="" />
            </a>
            <h2>{t("Two Factor Authentication")}</h2>
            <p>
              {t(
                "Open your authentication app and enter the code for TradexPro Admin"
              )}
            </p>
          </div>
          <Formik
            initialValues={{
              code: "",
            }}
            validationSchema={Yup.object({
              code: Yup.string()
                .required(t("Code is required"))
                .min(6, t("Code must be at least 6 characters")),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              const code = parseInt(values.code);
              dispatch(G2fVerifyAction(code));
              setSubmitting(false);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-group">
                  <label>{t("Authentication Code")}</label>
                  <Field
                    type="number"
                    id="exampleInputEmail1"
                    name="code"
                    className={`form-control ${
                      touched.code && errors.code ? "is-invalid" : ""
                    }`}
                    placeholder="code"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary nimmu-user-sibmit-button mt-3"
                >
                  {t("Verify")}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await g2fPageRequireCheck(ctx);
  return { props: {} };
};

export default G2fverify;
