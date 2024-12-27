import React, { useState, ChangeEvent, useMemo } from 'react';
import { Box, Avatar, Typography, SxProps, Theme } from '@mui/material';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Image from 'next/image';
import { COLORS } from '@/constants/colors';
import { UtilsApi } from '@/endpoints/utils';
import { S3_URL } from '@/constants/config';
import Cookies from 'js-cookie';

interface ImagePickerProps {
  imageUrl?: string;
  onImageUpload: (imageUrl: string) => void; // Add a prop for the image upload handler
}

const ImagePicker = ({ onImageUpload, imageUrl }: ImagePickerProps) => {
  const token = Cookies.get('token');
  const [selectedImage, setSelectedImage] = useState<string | null>(
    imageUrl || null
  );

  const utilsApi = useMemo(() => new UtilsApi(token || ''), [token]);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      const response = await utilsApi.uploadMedia(formData);
      if (response?.success) {
        const imageUrl = `${S3_URL}${response?.data.doc.filename}`;
        setSelectedImage(imageUrl);
        onImageUpload(imageUrl);
      }
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <Box sx={styles.container} data-testid="image-picker">
      <label htmlFor="upload-image">
        <input
          accept="image/*"
          id="upload-image"
          type="file"
          style={{ display: 'none' }}
          onChange={handleImageChange}
          data-testid="upload-input"
        />
        <Avatar sx={styles.avatar} data-testid="avatar">
          {selectedImage || imageUrl ? (
            <Image
              src={selectedImage || imageUrl || ''}
              alt="Profile"
              width={124}
              height={124}
              style={{ width: '100%', height: '100%', borderRadius: '50%' }}
              data-testid="selected-image"
            />
          ) : (
            <CameraIcon sx={styles.cameraIcon} />
          )}
        </Avatar>
      </label>
      <Box>
        <Typography variant="body1" color="success.main">
          Change Profile Photo
        </Typography>
        <Typography fontSize={10} variant="body2" my={1} color="textSecondary">
          File types supported: JPG, PNG, Max size: 12 MB
        </Typography>
        {selectedImage && (
          <Typography
            color="error"
            fontSize={12}
            sx={{ cursor: 'pointer' }}
            onClick={handleRemoveImage}
            data-testid="remove-image"
          >
            Remove Image
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ImagePicker;

const styles: Record<string, SxProps<Theme>> = {
  container: {
    gap: 2,
    padding: 2,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: { xs: 'center', sm: 'flex-start' },
    textAlign: { xs: 'center', sm: 'left' },
    flexDirection: { xs: 'column', sm: 'row' }
  },
  avatar: {
    width: 124,
    height: 124,
    bgcolor: COLORS.bgColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    cursor: 'pointer'
  },
  cameraIcon: {
    color: COLORS.lightGray,
    fontSize: 55
  }
};
