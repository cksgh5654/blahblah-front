import BaseButton from "../components/Button/BaseButton";
import BaseInput from "../components/Input/BaseInput";
import Avatar from "../components/Avatar";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getMyProfile, updateMyProfile } from "../apis/user.api";
import { imageUpload, multipleImageUpload } from "../config/aws.config";
import { Profile } from "../types/user.type";
import { useNavigate } from "react-router-dom";

const DEFAULT_PROFILE_DATA = {
  email: "",
  nickname: "",
  image: "",
  createdAt: "",
};
const ProfileUpdatePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [original, setOriginal] = useState<Profile>(DEFAULT_PROFILE_DATA);
  const [formData, setFormData] = useState<Profile>(DEFAULT_PROFILE_DATA);
  const [imageFile, setImageFile] = useState<File>();
  const isEdited = useMemo(
    () => JSON.stringify(original) !== JSON.stringify(formData),
    [formData]
  );

  const handleChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const previewImage = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, image: previewImage }));
    setImageFile(file);
    console.log(e.target.files[0]);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
    if (imageFile) {
      // imageUpload(imageFile) //
      //   .then((response) => {
      //     if (response)
      //       setFormData((prev) => ({ ...prev, image: response.Location }));
      //   });
      multipleImageUpload([imageFile, imageFile, imageFile]).then((response) =>
        console.log(response)
      );
    }

    // updateMyProfile(formData) //
    //   .then(() => navigate(`/@${formData.nickname}`));
  };

  useEffect(() => {
    getMyProfile() //
      .then((response) => {
        setOriginal(response);
        setFormData(response);
      });
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <Avatar size="large" url={formData.image} />
      <BaseInput
        type="file"
        className="hidden"
        onChange={handleChangeFileInput}
        ref={fileInputRef}
      />
      <BaseButton
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-fit"
      >
        이미지 업로드
      </BaseButton>
      <BaseInput
        withLabel="가입된 이메일"
        isRequired={false}
        readOnly
        value={formData.email}
      />
      <BaseInput
        withLabel="닉네임"
        value={formData.nickname}
        onChange={handleChangeInput}
        name="nickname"
      />
      <BaseButton className="w-fit" disabled={!isEdited}>
        프로필 수정
      </BaseButton>
    </form>
  );
};

export default ProfileUpdatePage;
