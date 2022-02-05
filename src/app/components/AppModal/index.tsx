import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  closeModal,
  driveWithDarkMode,
  geti18nConfig,
  getModalType,
  isModalVisible,
} from "@cianciarusocataldo/modular-engine";

import { Modal } from "@cianciarusocataldo/modular-ui";

/* istanbul ignore next */
const AppModal = ({
  modals,
}: {
  modals: Record<string, () => JSX.Element>;
}) => {
  const dispatch = useDispatch();
  const onClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);
  const type = useSelector(getModalType);
  const isVisible = useSelector(isModalVisible);
  const i18n = useSelector(geti18nConfig);
  const ModalContent = type && modals[type] ? modals[type] : () => <div />;

  const { t } = useTranslation(i18n.modalsNamespace);

  const ModalComponent = driveWithDarkMode(Modal);

  return (
    <ModalComponent
      onClose={onClose}
      title={type ? t(type) : ""}
      hide={!isVisible}
    >
      <ModalContent />
    </ModalComponent>
  );
};

export default AppModal;
