import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';

import Text from './TextRegular';
import FormButton from './FormButton';

const ModalWrapper = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  background-color: white;
  border-radius: 5;
  width: 300;
  height: 120;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  padding-top: 15;
`;

const Title = styled.Text`
  font-weight: 800;
  font-size: 18;
`;

const ModalConfirm = (props) => {
  const { visible, confirmModal, closeModal } = props;
  return (
    <Modal animationType="fade" presentationType="fullScreen" transparent visible={visible} {...props}>
      <ModalWrapper>
        <Container>
          <Title>Relax time has been ended.</Title>
          <Text>Do you want to start working again? :)</Text>
          <ButtonContainer>
            <FormButton onPress={confirmModal} title="Yes" />
            <FormButton onPress={closeModal} title="No" color="#841584" />
          </ButtonContainer>
        </Container>
      </ModalWrapper>
    </Modal>
  );
};

export default ModalConfirm;

ModalConfirm.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  confirmModal: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};
