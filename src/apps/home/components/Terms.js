import React from "react";
import "../style.css";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Terms = () => {
  const handleClose = () => {
    window.close();
  };

  const text = `These Terms of Use apply to your use of IYKYK NYC LLC Chatbots, AI Readers, and IYKYK NYC LLC other services for individuals, along with any associated software applications and websites (all together, “Services”). These Terms form an agreement between you and IYKYK NYC LLC, L.L.C., a New York company, and they include our Service Terms and important provisions for resolving disputes through arbitration. By using our Services, you agree to these Terms. 

  If you reside in the European Economic Area, Switzerland, or the UK, your use of the Services is governed by these terms.
  
  Our Business Terms govern use of Chatbots,and our APIs, and our other services for businesses and developers. 
  
  Our Privacy Policy explains how we collect and use personal information. Although it does not form part of these Terms, it is an important document that you should read.
  
  Who we are
  IYKYK NYC LLC is an AI software and deployment company. Our mission is focused on increasing efficiency, enhancing human creativity, and simplifying complex tech processes. 
  
  Registration and Access
  Minimum Age. You must be at least 13 years old or the minimum age required in your country to consent to use the Services. If you are under 18 you must have your parent or legal guardian’s permission to use the Services. 
  
  Registration. You must provide accurate and complete information to register for an account to use our Services. You may not share your account credentials or make your account available to anyone else and are responsible for all activities that occur under your account. If you create an account or use the Services on behalf of another person or entity, you must have the authority to accept these Terms on their behalf.
  
  Using Our Services
  Subject to your compliance with these Terms, you may access and use our Services. In using our Services, you must comply with all applicable laws as well as our Sharing & Publication Policy, Usage Policies, and any other documentation, guidelines, or policies we make available to you. 
  
  You may not use our Services for any illegal, harmful, or abusive activity. For example, you may not:
  
  Use our Services in a way that infringes, misappropriates or violates anyone’s rights.
  Modify, copy, lease, sell or distribute any of our Services.
  Attempt to or assist anyone to reverse engineer, decompile or discover the source code or underlying components or API's of our Services, including our models, algorithms, or systems (except to the extent this restriction is prohibited by applicable law).
  Automatically or programmatically extract data or Output (defined below).
  Represent that Output was human-generated when it was not.
  
  Interfere with or disrupt our Services, including circumvent any rate limits or restrictions or bypass any protective measures or safety mitigations we put on our Services.
  Use the Output to develop models that compete with IYKYK NYC LLC.Software. 
  Our software may include open source software that is governed by its own licenses that we’ve made available to you.
  
  Third Party Services. Our services may include third party software, products, or services, (“Third Party Services”) and some parts of our Services, like our browse feature, may include output from those services (“Third Party Output”). Third Party Services and Third Party Output are subject to their own terms, and we are not responsible for them. 
  
  We value your feedback, and you agree that we may use it without restriction or compensation to you.
  
  Content
  You may provide input to the Services (“Input”), and receive output from the Services based on the Input (“Output”). Input and Output are collectively “Content.” You are responsible for said Content, including ensuring that it does not violate any applicable law or these Terms. You represent and warrant that you have all rights, licenses, and permissions needed to provide Input to our Services.
  
  As between you and IYKYK NYC LLC, and to the extent permitted by applicable law, you (a) retain your ownership rights in Input and (b) own the Output. We hereby assign to you all our right, title, and interest, if any, in and to Output. 
  
  Similarity of Content. Due to the nature of our Services and artificial intelligence generally, output may not be unique and other users may receive similar output from our Services. Our assignment above does not extend to other users’ output or any Third Party Output. 
  
  We may use Content to provide, maintain, develop, and improve our Services, comply with applicable law, enforce our terms and policies, and keep our Services safe. 
  
  Opt Out. If you do not want us to use your Content to train our models, you can opt out by contacting support.Please note that in some cases this may limit the ability of our Services to better address your specific use case.
  
  Artificial intelligence(AI) and machine learning(ML) are rapidly evolving fields of study. We are constantly working to improve our Services to make them more accurate, reliable, safe, and beneficial. Given the probabilistic nature of machine learning, use of our Services may, in some situations, result in Output that does not accurately reflect real people, places, or facts. 
  
  When you use our Services you understand and agree:
  
  Output may not always be accurate. You should not rely on Output from our Services as a sole source of truth or factual information, or as a substitute for professional advice.
  You must evaluate Output for accuracy and appropriateness for your use case, including using human review as appropriate, before using or sharing Output from the Services.
  You must not use any Output relating to a person for any purpose that could have a legal or material impact on that person, such as making credit, educational, employment, housing, insurance, legal, medical, or other important decisions about them. 
  Our Services may provide incomplete, incorrect, or offensive Output that does not represent IYKYK NYC LLC’s views. If Output references any third party products or services, it doesn’t mean the third party endorses or is affiliated with IYKYK NYC LLC.
  
  Our IP Rights
  We and our affiliates own all rights, title, and interest in and to the Services. 
  
  Service Credits. You can pay for some Services in advance by purchasing service credits. All service credits are subject to our Service Credit Terms.
  
  Cancellation. You can cancel your paid subscription at any time. Payments are non-refundable, except where required by law. These Terms do not override any mandatory local laws regarding your cancellation rights. 
  
  Paid Accounts
  Billing. If you purchase any Services, you will provide complete and accurate billing information, including a valid payment method. For paid subscriptions, we will automatically charge your payment method on each agreed-upon periodic renewal until you cancel. You’re responsible for all applicable taxes, and we’ll charge tax when required. If your payment cannot be completed, we may downgrade your account or suspend your access to our Services until payment is received. 
  
  Changes. We may change our prices from time to time. If we increase our subscription prices, we will give you at least 30 days’ notice and any price increase will take effect on your next renewal so that you can cancel if you do not agree to the price increase.
  
  Termination and Suspension
  You are free to stop using our Services at any time. We reserve the right to suspend or terminate your access to our Services or delete your account if we determine:
  
  You breached these Terms or our Usage Policies.
  We must do so to comply with the law.
  Your use of our Services could cause risk or harm to IYKYK NYC LLC, our users, or anyone else.
  We also may terminate your account if it has been inactive for over a year and you do not have a paid account. If we do, we will provide you with advance notice.
  
  If you believe we have suspended or terminated your account in error, you can file an appeal with us by contacting our Support team.
  
  Discontinuation of Services
  We may decide to discontinue our Services, but if we do, we will give you advance notice and a refund for any prepaid, unused Services.
  
  Disclaimer of Warranties
  OUR SERVICES ARE PROVIDED “AS IS.” EXCEPT TO THE EXTENT PROHIBITED BY LAW, WE AND OUR AFFILIATES AND LICENSORS MAKE NO WARRANTIES (EXPRESS, IMPLIED, STATUTORY OR OTHERWISE) WITH RESPECT TO THE SERVICES, AND DISCLAIM ALL WARRANTIES INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, SATISFACTORY QUALITY, NON-INFRINGEMENT, AND QUIET ENJOYMENT, AND ANY WARRANTIES ARISING OUT OF ANY COURSE OF DEALING OR TRADE USAGE. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ACCURATE OR ERROR FREE, OR THAT ANY CONTENT WILL BE SECURE OR NOT LOST OR ALTERED. 
  
  YOU ACCEPT AND AGREE THAT ANY USE OF OUTPUTS FROM OUR SERVICE IS AT YOUR SOLE RISK AND YOU WILL NOT RELY ON OUTPUT AS A SOLE SOURCE OF TRUTH OR FACTUAL INFORMATION, OR AS A SUBSTITUTE FOR PROFESSIONAL ADVICE.
  
  Limitation of Liability
  NEITHER WE NOR ANY OF OUR AFFILIATES OR LICENSORS WILL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, OR DATA OR OTHER LOSSES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR AGGREGATE LIABILITY UNDER THESE TERMS WILL NOT EXCEED ​​THE GREATER OF THE AMOUNT YOU PAID FOR THE SERVICE THAT GAVE RISE TO THE CLAIM DURING THE 12 MONTHS BEFORE THE LIABILITY AROSE OR ONE HUNDRED DOLLARS ($100). THE LIMITATIONS IN THIS SECTION APPLY ONLY TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW.
  
  Some countries and states do not allow the disclaimer of certain warranties or the limitation of certain damages, so some or all of the terms above may not apply to you, and you may have additional rights. In that case, these Terms only limit our responsibilities to the maximum extent permissible in your country of residence.
  
  IYKYK NYC LLC’S AFFILIATES, SUPPLIERS, LICENSORS, AND DISTRIBUTORS ARE INTENDED THIRD PARTY BENEFICIARIES OF THIS SECTION.
  
  Indemnity
  If you are a business or organization, to the extent permitted by law, you will indemnify and hold harmless us, our affiliates, and our personnel, from and against any costs, losses, liabilities, and expenses (including attorneys’ fees) from third party claims arising out of or relating to your use of the Services and Content or any violation of these Terms.
  
  Dispute Resolution
  YOU AND IYKYK NYC LLC AGREE TO THE FOLLOWING MANDATORY ARBITRATION AND CLASS ACTION WAIVER PROVISIONS:
  
  MANDATORY ARBITRATION. You and IYKYK NYC LLC agree to resolve any claims arising out of or relating to these Terms or our Services, regardless of when the claim arose, even if it was before these Terms existed (a “Dispute”), through final and binding arbitration. You may opt out of arbitration within 30 days of account creation or of any updates to these arbitration terms within 30 days after the update has taken effect by filling out this form. If you opt out of an update, the last set of agreed upon arbitration terms will apply. 
  
  Informal Dispute Resolution. We would like to understand and try to address your concerns prior to formal legal action. Before either of us files a claim against the other, we both agree to try to resolve the Dispute informally. You agree to do so by sending us notice through this form. We will do so by sending you notice to the email address associated with your account. If we are unable to resolve a Dispute within 60 days, either of us has the right to initiate arbitration. We also both agree to attend an individual settlement conference if either party requests one during this time. Any statute of limitations will be tolled during this informal resolution process.
  
  Arbitration Forum. If we are unable to resolve the Dispute, either of us may commence arbitration with National Arbitration and Mediation (“NAM”) under its Comprehensive Dispute Resolution Rules and Procedures and/or Supplemental Rules for Mass Arbitration Filings, as applicable (available here). IYKYK NYC LLC will not seek attorneys’ fees and costs in arbitration unless the arbitrator determines that your claim is frivolous. The activities described in these Terms involve interstate commerce and the Federal Arbitration Act will govern the interpretation and enforcement of these arbitration terms and any arbitration. 
  
  Arbitration Procedures. The arbitration will be conducted by videoconference if possible, but if the arbitrator determines a hearing should be conducted in person, the location will be mutually agreed upon, in the county where you reside, or as determined by the arbitrator, unless the batch arbitration process applies. The arbitration will be conducted by a sole arbitrator. The arbitrator will be either a retired judge or an attorney licensed to practice law in the state of California. The arbitrator will have exclusive authority to resolve any Dispute, except the state or federal courts of San Francisco, California have the authority to determine any Dispute about enforceability, validity of the class action waiver, or requests for public injunctive relief, as set out below. Any settlement offer amounts will not be disclosed to the arbitrator by either party until after the arbitrator determines the final award, if any. The arbitrator has the authority to grant motions dispositive of all or part of any Dispute. 
  
  Exceptions. This section does not require informal dispute resolution or arbitration of the following claims: (i) individual claims brought in small claims court; and (ii) injunctive or other equitable relief to stop unauthorized use or abuse of the Services or intellectual property infringement or misappropriation.
  
  CLASS AND JURY TRIAL WAIVERS. You and IYKYK NYC LLC agree that Disputes must be brought on an individual basis only, and may not be brought as a plaintiff or class member in any purported class, consolidated, or representative proceeding. Class arbitrations, class actions, and representative actions are prohibited. Only individual relief is available. The parties agree to sever and litigate in court any request for public injunctive relief after completing arbitration for the underlying claim and all other claims. This does not prevent either party from participating in a class-wide settlement. You and IYKYK NYC LLC knowingly and irrevocably waive any right to trial by jury in any action, proceeding, or counterclaim. 
  
  Severability. If any part of these arbitration terms is found to be illegal or unenforceable, the remainder will remain in effect, except that if a finding of partial illegality or unenforceability would allow class arbitration, class action, or representative action, this entire dispute resolution section will be unenforceable in its entirety.
  
  Copyright Complaints
  If you believe that your intellectual property rights have been infringed, please send notice to the address below or fill out this form. We may delete or disable content that we believe violates these Terms or is alleged to be infringing and will terminate accounts of repeat infringers where appropriate.
  
  IYKYK NYC LLC, L.L.C.
  148 W 24th St Ste 3 New York, NY
  Attn: General Counsel / Copyright Agent
  Written claims concerning copyright infringement must include the following information:
  
  A physical or electronic signature of the person authorized to act on behalf of the owner of the copyright interest
  A description of the copyrighted work that you claim has been infringed upon
  A description of where the allegedly infringing material is located on our site so we can find it
  Your address, telephone number, and e-mail address
  A statement by you that you have a good-faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law
  A statement by you that the above information in your notice is accurate and, under penalty of perjury, that you are the copyright owner or authorized to act on the copyright owner’s behalf
  General Terms
  Assignment. You may not assign or transfer any rights or obligations under these Terms and any attempt to do so will be void. We may assign our rights or obligations under these Terms to any affiliate, subsidiary, or successor in interest of any business associated with our Services.
  
  Changes to These Terms or Our Services. We are continuously working to develop and improve our Services. We may update these Terms or our Services accordingly from time to time. For example, we may make changes to these Terms or the Services due to:
  
  Changes to the law or regulatory requirements.
  Security or safety reasons.
  Circumstances beyond our reasonable control.
  Changes we make in the usual course of developing our Services.
  To adapt to new technologies.
  We will give you at least 30 days advance notice of changes to these Terms that materially adversely impact you either via email or an in-product notification. All other changes will be effective as soon as we post them to our website. If you do not agree to the changes, you must stop using our Services.
  
  Delay in Enforcing These Terms. Our failure to enforce a provision is not a waiver of our right to do so later. Except as provided in the dispute resolution section above, if any portion of these Terms is determined to be invalid or unenforceable, that portion will be enforced to the maximum extent permissible and it will not affect the enforceability of any other terms.
  
  Trade Controls. You must comply with all applicable trade laws, including sanctions and export control laws. Our Services may not be used in or for the benefit of, or exported or re-exported to (a) any U.S. embargoed country or territory or (b) any individual or entity with whom dealings are prohibited or restricted under applicable trade laws. Our Services may not be used for any end use prohibited by applicable trade laws, and your Input may not include material or information that requires a government license for release or export. 
  
  Entire Agreement. These Terms contain the entire agreement between you and IYKYK NYC LLC regarding the Services and, other than any Service-specific terms, supersedes any prior or contemporaneous agreements between you and IYKYK NYC LLC. 
  `;
  return (
    <>
      <div className="mt-3 px-24 z-[999]">
        <h1 align="center" className="title">
          Our Terms and Condition
        </h1>
        <div className="flex flex-col">
          <div>
            <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
          </div>
          <button
            type="submit"
            onClick={handleClose}
            align="center"
            className="btn submit-btn"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Terms;
