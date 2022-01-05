/* This example requires Tailwind CSS v2.0+ */
import { XIcon, SpeakerphoneIcon } from "@heroicons/react/outline";

export default function ReferralBanner() {
  return (
    <div className="relative bg-blue-600">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="text-center sm:px-16">
          <p className="font-medium text-white text-center">
            <span className="inline">
              <SpeakerphoneIcon
                className="h-6 w-6 text-white inline mr-2"
                aria-hidden="true"
              />{" "}
              Get 20% discount off your trading fees by using{" "}
              <a
                href="https://referral.perp.com/?code=perpterminal"
                rel="noopener"
                target="_blank"
                className="text-white font-bold underline">
                {" "}
                this link <span aria-hidden="true">&rarr;</span>
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
