import React from "react";
import { KeyCloakOAuthURL } from "@appsmith/constants/ApiConstants";
import { Redirect, useLocation } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import type { DecoratedFormProps } from "redux-form";
import { reduxForm, formValueSelector, isDirty } from "redux-form";
import {
  LOGIN_FORM_NAME,
  LOGIN_FORM_EMAIL_FIELD_NAME,
  LOGIN_FORM_PASSWORD_FIELD_NAME,
} from "@appsmith/constants/forms";
import { FORGOT_PASSWORD_URL, SETUP, SIGN_UP_URL } from "constants/routes";
import {
  LOGIN_PAGE_TITLE,
  FORM_VALIDATION_EMPTY_PASSWORD,
  FORM_VALIDATION_INVALID_EMAIL,
  LOGIN_PAGE_SIGN_UP_LINK_TEXT,
  LOGIN_PAGE_INVALID_CREDS_ERROR,
  LOGIN_PAGE_INVALID_CREDS_FORGOT_PASSWORD_LINK,
  NEW_TO_APPSMITH,
  createMessage,
  LOGIN_PAGE_SUBTITLE,
} from "@appsmith/constants/messages";
import { Button, Link, Callout } from "design-system";
import { isEmail, isEmptyString } from "utils/formhelpers";
import type { LoginFormValues } from "pages/UserAuth/helpers";

import { getIsSafeRedirectURL } from "utils/helpers";
import { getCurrentUser } from "selectors/usersSelectors";
import Container from "pages/UserAuth/Container";
import { getIsFormLoginEnabled } from "@appsmith/selectors/tenantSelectors";
import Helmet from "react-helmet";
import { useHtmlPageTitle } from "@appsmith/utils";

const validate = (values: LoginFormValues, props: ValidateProps) => {
  const errors: LoginFormValues = {};
  const email = values[LOGIN_FORM_EMAIL_FIELD_NAME] || "";
  const password = values[LOGIN_FORM_PASSWORD_FIELD_NAME];
  const { isPasswordFieldDirty, touch } = props;
  if (!password || isEmptyString(password)) {
    isPasswordFieldDirty && touch?.(LOGIN_FORM_PASSWORD_FIELD_NAME);
    errors[LOGIN_FORM_PASSWORD_FIELD_NAME] = createMessage(
      FORM_VALIDATION_EMPTY_PASSWORD,
    );
  }
  if (!isEmptyString(email) && !isEmail(email)) {
    touch?.(LOGIN_FORM_EMAIL_FIELD_NAME);
    errors[LOGIN_FORM_EMAIL_FIELD_NAME] = createMessage(
      FORM_VALIDATION_INVALID_EMAIL,
    );
  }

  return errors;
};

type ValidateProps = {
  isPasswordFieldDirty?: boolean;
} & DecoratedFormProps<
  LoginFormValues,
  { emailValue: string; isPasswordFieldDirty?: boolean }
>;

export function Login() {
  const location = useLocation();
  const isFormLoginEnabled = useSelector(getIsFormLoginEnabled);
  const queryParams = new URLSearchParams(location.search);
  const htmlPageTitle = useHtmlPageTitle();
  const invalidCredsForgotPasswordLinkText = createMessage(
    LOGIN_PAGE_INVALID_CREDS_FORGOT_PASSWORD_LINK,
  );
  let showError = false;
  let errorMessage = "";
  const currentUser = useSelector(getCurrentUser);
  if (currentUser?.emptyInstance) {
    return <Redirect to={SETUP} />;
  }
  if (queryParams.get("error")) {
    errorMessage = queryParams.get("message") || queryParams.get("error") || "";
    showError = true;
  }
  let signupURL = SIGN_UP_URL;
  const redirectUrl = queryParams.get("redirectUrl");
  if (redirectUrl != null && getIsSafeRedirectURL(redirectUrl)) {
    const encodedRedirectUrl = encodeURIComponent(redirectUrl);
    signupURL += `?redirectUrl=${encodedRedirectUrl}`;
  }

  const footerSection = isFormLoginEnabled && (
    <div className="px-2 py-4 flex align-center justify-center text-base text-center text-[color:var(--ads-v2\-color-fg)] text-[14px]">
      {createMessage(NEW_TO_APPSMITH)}
      <Link
        className="t--sign-up t--signup-link pl-[var(--ads-v2\-spaces-3)]"
        kind="primary"
        target="_self"
        to={signupURL}
      >
        {createMessage(LOGIN_PAGE_SIGN_UP_LINK_TEXT)}
      </Link>
    </div>
  );

  return (
    <Container
      footer={footerSection}
      subtitle={createMessage(LOGIN_PAGE_SUBTITLE)}
      title={createMessage(LOGIN_PAGE_TITLE)}
    >
      <Helmet>
        <title>{htmlPageTitle}</title>
      </Helmet>

      {showError && (
        <Callout
          kind="error"
          links={
            !!errorMessage
              ? undefined
              : [
                  {
                    children: invalidCredsForgotPasswordLinkText,
                    to: FORGOT_PASSWORD_URL,
                  },
                ]
          }
        >
          {!!errorMessage && errorMessage !== "true"
            ? errorMessage
            : createMessage(LOGIN_PAGE_INVALID_CREDS_ERROR)}
        </Callout>
      )}
      <Button href={KeyCloakOAuthURL} renderAs="a" startIcon="key">
        Single Sign-On
      </Button>
    </Container>
  );
}

const selector = formValueSelector(LOGIN_FORM_NAME);
export default connect((state) => ({
  emailValue: selector(state, LOGIN_FORM_EMAIL_FIELD_NAME),
  isPasswordFieldDirty: isDirty(LOGIN_FORM_NAME)(
    state,
    LOGIN_FORM_PASSWORD_FIELD_NAME,
  ),
}))(
  reduxForm<LoginFormValues, { emailValue: string }>({
    validate,
    touchOnBlur: false,
    form: LOGIN_FORM_NAME,
  })(Login),
);
