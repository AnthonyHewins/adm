import apiCall from 'services/core';
import config from 'config';

const acctConfirmation = async (
  token: string,
) => {
  await apiCall(`${config.acctConfirmation}?token=${token}`)
}

export default acctConfirmation;
