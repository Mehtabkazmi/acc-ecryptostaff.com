import React, { SetStateAction } from "react";
import { toast } from "react-toastify";
import {
  UserSettingsApi,
  Google2faSetupApi,
  Google2faLoginApi,
  LanguageSetupApi,
} from "service/settings";
import { setLoading } from "state/reducer/user";

export const UserSettingsAction =
  (setSettings: React.Dispatch<SetStateAction<object>>) =>
  async (dispatch: any) => {
    dispatch(setLoading(true));
    const settings = await UserSettingsApi();
    setSettings(settings.data);
    dispatch(setLoading(false));
  };
export const Google2faLoginAction = async () => {
  const setup = await Google2faLoginApi();
  if (setup.success) {
    toast.success(setup.message);
  } else {
    toast.error(setup.message);
  }

  return setup.data;
};

export const SetupLanguageAction = async (
  credential: { language: string },
  setLanguageSelected: any
) => {
  const language = await LanguageSetupApi(credential);
  if (language.success) {
    toast.success(language.message);
    setLanguageSelected(language?.data?.language);
  } else {
    toast.error(language.message);
  }
};

export const SetupGoogle2faAction = async (
  credentials: {
    setup: string;
    code: string;
    google2fa_secret: string;
  },
  setSettings: any
) => {
  const setup = await Google2faSetupApi(credentials);
  toast.warning(setup.message);
  const settings = await UserSettingsApi();
  setSettings(settings.data);
  return setup.data;
};
