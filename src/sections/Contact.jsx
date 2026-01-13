import BentoCard from '../components/BentoCard';
import { contactData } from '../utils/data';
import { MdContactMail, MdPhone } from 'react-icons/md';
import { RiFacebookLine, RiLinkedinLine } from 'react-icons/ri';
import { SiGmail } from 'react-icons/si';

const Contact = () => {
  const iconMap = {
    SiGmail,
    MdPhone,
    RiFacebookLine,
    RiLinkedinLine,
  };

  return (
    <BentoCard size="medium" hover={true}>
      {/* Header - Icon and Title */}
      <div className="flex items-center gap-2 mb-2 md:mb-3">
        <MdContactMail className="text-lg md:text-xl text-yellow-500" />
        <h3 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">Let's Connect</h3>
      </div>

      {/* Contact Methods - Larger, More Spacious */}
      <div className="space-y-1.5 md:space-y-2 mb-2 md:mb-3">
        {/* Email */}
        <a
          href={contactData.methods[0].link}
          className="flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 rounded-lg bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-2 border-yellow-200 dark:border-yellow-700 hover:border-yellow-500 hover:shadow-lg transition-all duration-300 group"
        >
          <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <SiGmail className="text-xs md:text-sm text-white" />
          </div>
          <div className="flex-grow text-left">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Email</p>
            <p className="text-xs text-gray-900 dark:text-white font-semibold truncate">{contactData.methods[0].value}</p>
          </div>
        </a>

        {/* Phone */}
        <a
          href={contactData.methods[1].link}
          className="flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 rounded-lg bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-2 border-yellow-200 dark:border-yellow-700 hover:border-yellow-500 hover:shadow-lg transition-all duration-300 group"
        >
          <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <MdPhone className="text-xs md:text-sm text-white" />
          </div>
          <div className="flex-grow text-left">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Phone</p>
            <p className="text-xs text-gray-900 dark:text-white font-semibold">{contactData.methods[1].value}</p>
          </div>
        </a>
      </div>

      {/* Social Media - Larger Cards */}
      <div>
        <h4 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-1.5 md:mb-2">Socials</h4>
        <div className="grid grid-cols-2 gap-1.5 md:gap-2">
          {contactData.methods[2].socials.map((social, idx) => {
            const SocialIcon = iconMap[social.icon];
            return (
              <a
                key={idx}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-0.5 md:gap-1 p-2 md:p-2.5 rounded-lg bg-gray-50 dark:bg-black border-2 border-gray-200 dark:border-gray-900 text-gray-900 dark:text-white font-semibold hover:bg-yellow-500 hover:border-yellow-500 hover:text-white transition-all duration-300 group"
              >
                {SocialIcon && <SocialIcon className="text-base md:text-lg group-hover:scale-110 transition-transform duration-300" />}
                <span className="text-xs">{social.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </BentoCard>
  );
};

export default Contact;
