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
import { imageUpload } from "../config/aws.config";
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
      imageUpload(imageFile) //
        .then((response) => {
          if (response) setFormData((prev) => ({ ...prev, image: response }));
        });
    }

    updateMyProfile(formData) //
      .then(() => navigate(`/@${formData.nickname}`));
  };

  useEffect(() => {
    getMyProfile() //
      .then((response) => {
        setOriginal(response);
        setFormData(response);
      });
  }, []);

  return (
    <div className="w-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-[768px] py-10 flex flex-col gap-y-8"
      >
        <div className="flex gap-x-4">
          <Avatar
            size="xlarge"
            url={formData.image}
            onClick={() => fileInputRef.current?.click()}
          />
          <div className="flex flex-col justify-center gap-y-2">
            <BaseInput
              type="file"
              className="hidden"
              withLabel="프로필 사진"
              onChange={handleChangeFileInput}
              ref={fileInputRef}
            />
            <BaseButton
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs"
            >
              이미지 업로드
            </BaseButton>
          </div>
        </div>
        <BaseInput
          withLabel="가입된 이메일"
          isRequired={false}
          readOnly
          value={formData.email}
          className="border-none font-bold"
        />
        <BaseInput
          withLabel="닉네임"
          value={formData.nickname}
          onChange={handleChangeInput}
          name="nickname"
        />
        <BaseButton className="w-fit" disabled={!isEdited}>
          프로필 저장 하기
        </BaseButton>
      </form>
    </div>
  );
};

export default ProfileUpdatePage;
