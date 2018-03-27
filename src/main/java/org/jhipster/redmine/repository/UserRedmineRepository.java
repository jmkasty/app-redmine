package org.jhipster.redmine.repository;

import org.jhipster.redmine.domain.UserRedmine;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UserRedmine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserRedmineRepository extends JpaRepository<UserRedmine, Long> {

}
