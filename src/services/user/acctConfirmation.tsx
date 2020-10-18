import apiCall from 'services/core';
import config from 'config';

const acctConfirmation = async (
  token: string,
): boolean => {
  await apiCall(`${config.acctConfirmation}?token=${token}`)
}

export default acctConfirmation;
