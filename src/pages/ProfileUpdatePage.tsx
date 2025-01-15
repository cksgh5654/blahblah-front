import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "@components/Avatar";
import BaseInput from "@components/Input/BaseInput";
import BaseButton from "@components/Button/BaseButton";
import { useUserContext } from "@context/userContext";
import { Profile } from "~types/user.type";
import { updateMyProfile } from "@apis/user.api";
import { imageUpload } from "@config/aws.config";

const ProfileUpdatePage = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [original, setOriginal] = useState<Profile>(user);
  const [formData, setFormData] = useState<Profile>(user);
  const [imageFile, setImageFile] = useState<File>();
  const { updateUser } = useUserContext();
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
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let updatedFormData = { ...formData };
      if (imageFile) {
        const url = await imageUpload(imageFile);
        updatedFormData = { ...formData, image: url };
      }
      await updateMyProfile(updatedFormData);
      updateUser(updatedFormData);
      navigate(`/profile/${updatedFormData.email}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user.email) return;
    if (user.email !== email) {
      navigate(`/${user.email}/profile`, { replace: true });
    }
    setOriginal(user);
    setFormData(user);
  }, [user, email]);

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
