'use client';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '/public/assets/svg/home-contained.svg';
import Image from 'next/image';
import Link from 'next/link';
import arrowRight from '/public/assets/svg/arrow-right-primary.svg';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  title: string;
  link?: string;
}

interface IconBreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export default function IconBreadcrumbs({ items }: IconBreadcrumbsProps) {
  const pathname = usePathname();
  const pathnames = pathname.split('/').filter((x) => x);

  const generatePath = (index: number) =>
    `/${pathnames.slice(0, index + 1).join('/')}`;

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const renderBreadcrumbItems = () => {
    if (items && items.length > 0) {
      return items.map((item, index) => {
        const isLast = index === items.length - 1;

        return isLast ? (
          <Typography
            key={item.title}
            fontWeight="medium"
            color="primary.main"
            style={{ textTransform: 'capitalize' }}
          >
            {item.title}
          </Typography>
        ) : item.link ? (
          <Link
            key={item.title}
            href={item.link}
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none'
            }}
          >
            <Typography fontWeight="medium" color="primary.main">
              {item.title}
            </Typography>
          </Link>
        ) : (
          <Typography
            key={item.title}
            fontWeight="medium"
            color="primary.main"
            style={{ textTransform: 'capitalize' }}
          >
            {item.title}
          </Typography>
        );
      });
    }

    // Otherwise, render breadcrumb based on the current path
    return pathnames.map((name, index) => {
      const isLast = index === pathnames.length - 1;
      const href = generatePath(index);

      return isLast ? (
        <Typography
          key={name}
          fontWeight="medium"
          color="primary.main"
          style={{ textTransform: 'capitalize' }}
        >
          {capitalize(name.replace(/-/g, ' '))}
        </Typography>
      ) : (
        <Link
          key={name}
          href={href}
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none'
          }}
        >
          <Typography fontWeight="medium" color="primary.main">
            {capitalize(name.replace(/-/g, ' '))}
          </Typography>
        </Link>
      );
    });
  };

  return (
    <Breadcrumbs
      separator={
        <Image src={arrowRight} alt="arrow right" height={16} width={16} />
      }
      aria-label="breadcrumb"
    >
      <Link style={{ display: 'flex', alignItems: 'center' }} href="/">
        <Image alt="home icon" src={HomeIcon} />
      </Link>
      {renderBreadcrumbItems()}
    </Breadcrumbs>
  );
}
