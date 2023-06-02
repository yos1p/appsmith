import { updateApplication } from "actions/applicationActions";
import { UpdateApplicationPayload } from "api/ApplicationApi";
import {
  GENERAL_SETTINGS_APP_ICON_LABEL,
  GENERAL_SETTINGS_APP_NAME_LABEL,
  GENERAL_SETTINGS_APP_PRIORITY_INVALID,
  GENERAL_SETTINGS_APP_PRIORITY_LABEL,
  GENERAL_SETTINGS_NAME_EMPTY_MESSAGE,
} from "@appsmith/constants/messages";
import classNames from "classnames";
import {
  AppIconName,
  TextInput,
  IconSelector,
  Text,
  TextType,
} from "design-system-old";
import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentApplication,
  getIsSavingAppName,
} from "selectors/applicationSelectors";
import { getCurrentApplicationId } from "selectors/editorSelectors";
import styled from "styled-components";
import TextLoaderIcon from "../Components/TextLoaderIcon";

const IconSelectorWrapper = styled.div`
  position: relative;
  .icon-selector {
    max-height: 100px;
    padding: 0;
    .t--icon-selected,
    .t--icon-not-selected {
      margin: 0;
    }
    gap: 3px;
  }
  .icon-selector::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
  .icon-selector::-webkit-scrollbar {
    width: 0px;
  }
`;

function GeneralSettings() {
  const dispatch = useDispatch();
  const applicationId = useSelector(getCurrentApplicationId);
  const application = useSelector(getCurrentApplication);
  const isSavingAppName = useSelector(getIsSavingAppName);

  const [applicationName, setApplicationName] = useState(application?.name);
  const [isAppNameValid, setIsAppNameValid] = useState(true);
  const [applicationIcon, setApplicationIcon] = useState(
    application?.icon as AppIconName,
  );
  const [appPriority, setAppPriority] = useState(application?.priority);
  if (appPriority === undefined) {
    setAppPriority(100);
  }
  const [isAppPriorityValid, setIsAppPriorityValid] = useState(true);

  useEffect(() => {
    !isSavingAppName && setApplicationName(application?.name);
  }, [application, application?.name, isSavingAppName]);

  const updateAppSettings = useCallback(
    debounce((icon?: AppIconName) => {
      const isAppNameUpdated = applicationName !== application?.name;
      const isAppPriorityUpdated = appPriority !== application?.priority;

      const payload: UpdateApplicationPayload = { currentApp: true };
      if (isAppNameUpdated && isAppNameValid) {
        payload.name = applicationName;
      }
      icon ? (payload.icon = icon) : null;
      if (isAppPriorityUpdated && isAppPriorityValid) {
        payload.priority = appPriority;
      }

      (isAppNameUpdated || icon || isAppPriorityUpdated) &&
        dispatch(updateApplication(applicationId, payload));
    }, 50),
    [applicationName, appPriority, application, applicationId],
  );

  return (
    <>
      <Text type={TextType.P1}>{GENERAL_SETTINGS_APP_NAME_LABEL()}</Text>
      <div
        className={classNames({
          "pt-1 pb-2 relative": true,
          "pb-4": !isAppNameValid,
        })}
      >
        {isSavingAppName && <TextLoaderIcon />}
        <TextInput
          defaultValue={applicationName}
          fill
          id="t--general-settings-app-name"
          // undefined sent implicitly - parameter "icon"
          onBlur={() => updateAppSettings()}
          onChange={(value: string) =>
            !isSavingAppName && setApplicationName(value)
          }
          onKeyPress={(ev: React.KeyboardEvent) => {
            if (ev.key === "Enter") {
              // undefined sent implicitly - parameter "icon"
              updateAppSettings();
            }
          }}
          placeholder="App name"
          type="input"
          validator={(value: string) => {
            let result: { isValid: boolean; message?: string } = {
              isValid: true,
            };
            if (!value || value.trim().length === 0) {
              setIsAppNameValid(false);
              result = {
                isValid: false,
                message: GENERAL_SETTINGS_NAME_EMPTY_MESSAGE(),
              };
            }
            setIsAppNameValid(result.isValid);
            return result;
          }}
          value={applicationName}
        />
      </div>

      <Text type={TextType.P1}>{GENERAL_SETTINGS_APP_ICON_LABEL()}</Text>
      <IconSelectorWrapper className="pt-1" id="t--general-settings-app-icon">
        <IconSelector
          className="icon-selector"
          fill
          onSelect={(icon: AppIconName) => {
            setApplicationIcon(icon);
            // updateAppSettings - passing `icon` because `applicationIcon`
            // will be not updated untill the component is re-rendered
            updateAppSettings(icon);
          }}
          selectedColor="black"
          selectedIcon={applicationIcon}
        />
      </IconSelectorWrapper>

      <Text type={TextType.P1}>{GENERAL_SETTINGS_APP_PRIORITY_LABEL()}</Text>
      <div
        className={classNames({
          "pt-1 pb-2 relative": true,
          "pb-4": !isAppNameValid,
        })}
      >
        {isSavingAppName && <TextLoaderIcon />}
        <TextInput
          defaultValue={appPriority}
          fill
          id="t--general-settings-app-priority"
          // undefined sent implicitly - parameter "icon"
          onBlur={() => updateAppSettings()}
          onChange={(value: string) => setAppPriority(Number(value))}
          onKeyPress={(ev: React.KeyboardEvent) => {
            if (ev.key === "Enter") {
              // undefined sent implicitly - parameter "icon"
              updateAppSettings();
            }
          }}
          placeholder="App priority (0-1000)"
          type="input"
          validator={(value: string) => {
            let result: { isValid: boolean; message?: string } = {
              isValid: true,
            };
            // check if value is a number between 0 and 1000
            if (
              !/^\d+$/.test(value) ||
              Number(value) < 0 ||
              Number(value) > 1000
            ) {
              setIsAppPriorityValid(false);
              result = {
                isValid: false,
                message: GENERAL_SETTINGS_APP_PRIORITY_INVALID(),
              };
            }
            setIsAppPriorityValid(result.isValid);
            return result;
          }}
          value={appPriority}
        />
      </div>
    </>
  );
}

export default GeneralSettings;
