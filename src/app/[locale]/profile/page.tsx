"use client";
import {
  Experience,
  NavBar,
  Overview,
  PageLayout,
  SectionCard,
} from "@/components/profile";
import { PROFILE_SECTION } from "@/constants/profile";

const ProfilePage = () => {
  return (
    <PageLayout>
      <NavBar />
      <SectionCard>
        <Overview />
      </SectionCard>
      <SectionCard id={PROFILE_SECTION.EXPERIENCE}>
        <Experience />
      </SectionCard>
    </PageLayout>
  );
};

export default ProfilePage;
