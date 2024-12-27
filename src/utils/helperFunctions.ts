/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableTextBlock } from '@portabletext/types';

export function formatAdmissionDeadline(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  };

  const date = new Date(dateString);
  const formattedDate = date
    .toLocaleDateString('en-GB', options)
    .replace(/ /g, ' ');
  const hasPassed = date < new Date();

  return {
    formattedDate,
    hasPassed
  };
}

export function getYearFromTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  return year;
}

export function formattedDate(inputDate: string): string {
  if (!inputDate) return '';
  const date = new Date(inputDate);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getNextTenYears(): { label: string; value: string }[] {
  const currentYear = new Date().getFullYear();
  const yearsArray = [];

  for (let i = 0; i < 2; i++) {
    const year = currentYear + i;
    yearsArray.push({
      label: year.toString(),
      value: year.toString()
    });
  }

  return yearsArray;
}

export const toKebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '_')
    .toLowerCase();
};

export const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

export const transformToPortableText = (data: any[]): PortableTextBlock[] => {
  return data.flatMap((section) => {
    const blocks = section.value.map((block: any, index: number) => {
      const children = block.children.map((child: any, childIdx: number) => ({
        _type: 'span',
        _key: `${section.id}-${index}-${childIdx}`,
        text: child.text || '',
        marks: child.bold ? ['bold'] : []
      }));

      if (block.type === 'ol' || block.type === 'ul') {
        return block.children.map((listItem: any, listIdx: number) => ({
          _type: 'block',
          _key: `${section.id}-${index}-${listIdx}`,
          listItem: block.type === 'ol' ? 'number' : 'bullet',
          style: 'normal',
          children: listItem.children.map((child: any, childIdx: number) => ({
            _type: 'span',
            _key: `${section.id}-${index}-${listIdx}-${childIdx}`,
            text: child.text || '',
            marks: child.bold ? ['bold'] : []
          }))
        }));
      }

      return {
        _type: 'block',
        _key: `${section.id}-${index}`,
        style: 'normal',
        children
      };
    });

    return blocks.flat();
  });
};

export const formatMoney = (amount: number): string => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
};

export const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'pending':
      return '#F5B700';
    case 'approved':
      return '#4CAF50';
    case 'rejected':
      return '#FF5252';
    default:
      return '#F5B700';
  }
};
