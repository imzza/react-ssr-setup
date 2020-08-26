import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Page, PageProps } from '../type';

const PageNotFound: Page<PageProps> = ({ route }: PageProps) => {
  const { t } = useTranslation('pages');
  return (
    <>
      <Helmet>
        <title>{t(`${route?.key}.meta.title`)}</title>
      </Helmet>
      <h2>{t(`${route?.key}.body.content`)}</h2>
    </>
  );
};

export default PageNotFound as React.FunctionComponent;
