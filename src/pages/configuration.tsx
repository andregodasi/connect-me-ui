import React from 'react';
import { Placeholder } from '@/components/Placeholder';
import MainContainer from '@/containers/MainContainer';
import constructionSite from '@/images/svg/construction_site.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'antd';

export default function Configuration() {
  const router = useRouter();
  return (
    <MainContainer>
      <div className="h-full w-full">
        <Placeholder
          image={constructionSite}
          alt="Página de configurações está em construção"
          title="Página de configurações está em construção"
          descriptionTop="Em breve você poderá configurar a plataforma de acordo com suas necessidades."
        />
        <div className="flex w-full justify-center gap-4">
          <Button
            shape="round"
            size="large"
            type="text"
            onClick={() => router.back()}
          >
            Voltar
          </Button>
          <Link href="/">
            <Button shape="round" size="large" type="primary">
              Ir para home?
            </Button>
          </Link>
        </div>
      </div>
    </MainContainer>
  );
}
